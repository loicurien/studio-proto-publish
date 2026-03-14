import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { UrlPresignerService } from '../../../common/url-presigner/url-presigner.service';
import { UserRequestCredentialsService } from '../../../common/http-client/user-request-credentials.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';
import { AyrshareProfileService } from './ayrshare-profile.service';
import { Distribution } from '@prisma/client';

export interface CreateDistributionInput {
  platform: string;
  postText?: string;
  mediaUrls?: string[];
  scheduledAt?: Date;
  platformOptions?: Record<string, unknown>;
  preferredFormat?: string;
  hashtags?: string[];
}

export interface UpdateDistributionInput {
  postText?: string;
  mediaUrls?: string[];
  scheduledAt?: Date;
  platformOptions?: Record<string, unknown>;
  hashtags?: string[];
}

@Injectable()
export class DistributionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ayrshare: AyrshareRepository,
    private readonly ayrshareProfiles: AyrshareProfileService,
    private readonly userRequest: UserRequestCredentialsService,
    private readonly urlPresigner: UrlPresignerService,
  ) {}

  async findByPublicationId(publicationId: string): Promise<Distribution[]> {
    return this.prisma.distribution.findMany({
      where: { publicationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTopViewedHashtags(
    limit = 10,
  ): Promise<{ items: { tag: string; views: number }[]; error?: string }> {
    try {
      const rows = await this.prisma.distribution.findMany({
        where: { hashtags: { not: null } },
        select: { hashtags: true, viewCount: true },
      });
      const viewsByTag = new Map<string, number>();
      for (const row of rows) {
        if (!row.hashtags) continue;
        let tags: string[];
        try {
          tags = JSON.parse(row.hashtags) as string[];
        } catch {
          continue;
        }
        const views = row.viewCount ?? 0;
        for (const t of Array.isArray(tags) ? tags : []) {
          const tag = typeof t === 'string' ? t.trim() : '';
          if (!tag) continue;
          const normalized = tag.startsWith('#') ? tag : `#${tag}`;
          viewsByTag.set(normalized, (viewsByTag.get(normalized) ?? 0) + views);
        }
      }
      const items = [...viewsByTag.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([tag, views]) => ({ tag, views }));
      return { items };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load top hashtags by views';
      return { items: [], error: message };
    }
  }

  async findOne(id: string): Promise<Distribution> {
    const d = await this.prisma.distribution.findUnique({
      where: { id },
      include: { publication: true },
    });
    if (!d) {
      throw new NotFoundException(`Distribution ${id} not found`);
    }
    return d as Distribution;
  }

  async create(
    publicationId: string,
    input: CreateDistributionInput,
  ): Promise<Distribution> {
    const pub = await this.prisma.publication.findUnique({
      where: { id: publicationId },
    });
    if (!pub) {
      throw new NotFoundException(`Publication ${publicationId} not found`);
    }
    return this.prisma.distribution.create({
      data: {
        publicationId,
        platform: input.platform,
        status: 'draft',
        postText: input.postText ?? null,
        mediaUrls: input.mediaUrls ? JSON.stringify(input.mediaUrls) : null,
        scheduledAt: input.scheduledAt ?? null,
        platformOptions: input.platformOptions
          ? JSON.stringify(input.platformOptions)
          : null,
        hashtags: input.hashtags ? JSON.stringify(input.hashtags) : null,
        preferredFormat: input.preferredFormat ?? null,
      },
    });
  }

  async update(id: string, input: UpdateDistributionInput): Promise<Distribution> {
    await this.findOne(id);
    return this.prisma.distribution.update({
      where: { id },
      data: {
        ...(input.postText !== undefined && { postText: input.postText }),
        ...(input.mediaUrls !== undefined && {
          mediaUrls: input.mediaUrls ? JSON.stringify(input.mediaUrls) : null,
        }),
        ...(input.scheduledAt !== undefined && { scheduledAt: input.scheduledAt }),
        ...(input.platformOptions !== undefined && {
          platformOptions: JSON.stringify(input.platformOptions),
        }),
        ...(input.hashtags !== undefined && {
          hashtags: input.hashtags ? JSON.stringify(input.hashtags) : null,
        }),
      },
    });
  }

  async remove(id: string): Promise<void> {
    const d = await this.prisma.distribution.findUnique({
      where: { id },
      include: { publication: true },
    });
    if (!d) {
      throw new NotFoundException(`Distribution ${id} not found`);
    }
    if (d.ayrsharePostId) {
      let profileKey: string | undefined;
      if (d.publication.ayrshareProfileId) {
        try {
          profileKey = await this.ayrshareProfiles.getProfileKeyByIdOnly(
            d.publication.ayrshareProfileId,
          );
        } catch {
          // best-effort
        }
      }
      try {
        await this.ayrshare.deletePost(d.ayrsharePostId, profileKey);
      } catch {
        // best-effort
      }
    }
    await this.prisma.distribution.delete({ where: { id } });
  }

  async markPublicationForReview(publicationId: string): Promise<void> {
    await this.prisma.distribution.updateMany({
      where: {
        publicationId,
        status: { in: ['draft', 'failed', 'pending', 'processing'] },
      },
      data: { status: 'awaiting_approval' },
    });
  }

  async approvePublicationReview(publicationId: string): Promise<void> {
    await this.prisma.distribution.updateMany({
      where: { publicationId, status: 'awaiting_approval' },
      data: { status: 'draft' },
    });
  }

  private effective<T>(
    distVal: T | null | undefined,
    pubVal: T | null | undefined,
  ): T | undefined {
    if (distVal != null && distVal !== '') return distVal as T;
    if (pubVal != null && pubVal !== '') return pubVal as T;
    return undefined;
  }

  async publish(id: string): Promise<Distribution> {
    const d = await this.prisma.distribution.findUnique({
      where: { id },
      include: { publication: true },
    });
    if (!d) {
      throw new NotFoundException(`Distribution ${id} not found`);
    }
    if (d.status !== 'draft') {
      throw new BadRequestException(
        `Distribution must be in draft status to publish (current: ${d.status})`,
      );
    }

    const publication = d.publication;
    const postText = this.effective(d.postText, publication.postText) ?? '';
    let mediaUrls: string[] | undefined;
    const pubMediaByFormat = publication.mediaUrlsByFormat
      ? (JSON.parse(publication.mediaUrlsByFormat) as Record<string, string[]>)
      : undefined;
    if (d.preferredFormat && pubMediaByFormat?.[d.preferredFormat]?.length) {
      mediaUrls = pubMediaByFormat[d.preferredFormat];
    } else {
      const mediaUrlsStr = this.effective(d.mediaUrls, publication.mediaUrls);
      mediaUrls = mediaUrlsStr
        ? (JSON.parse(mediaUrlsStr) as string[])
        : undefined;
    }
    const scheduledAt = d.scheduledAt ?? publication.scheduledAt;
    const scheduleDate = scheduledAt ? scheduledAt.toISOString() : undefined;

    let resolvedMediaUrls: string[] | undefined;
    if (mediaUrls?.length) {
      try {
        resolvedMediaUrls = await Promise.all(
          mediaUrls.map(async (url) => {
            if (url.startsWith('http://') || url.startsWith('https://')) {
              return url;
            }
            const presigned = await this.urlPresigner.presignUrl(url);
            if (
              !presigned ||
              (!presigned.startsWith('http://') && !presigned.startsWith('https://'))
            ) {
              throw new BadRequestException(
                `Media URL could not be resolved to a public URL. Key: ${url.slice(0, 80)}...`,
              );
            }
            return presigned;
          }),
        );
      } catch (err: unknown) {
        if (err instanceof BadRequestException) throw err;
        const message = err instanceof Error ? err.message : String(err);
        if (/Credentials|SSO|Token|credential/i.test(message)) {
          throw new ServiceUnavailableException(
            'AWS credentials are expired or missing. Run: aws sso login',
          );
        }
        throw err;
      }
    }

    const payload: Record<string, unknown> = {
      post: postText,
      platforms: [d.platform],
      mediaUrls: resolvedMediaUrls,
      scheduleDate,
    };
    if (resolvedMediaUrls?.length && resolvedMediaUrls.some((u) => u.includes('?'))) {
      payload.isVideo = true;
    }

    const platformOptions = d.platformOptions
      ? (JSON.parse(d.platformOptions) as Record<string, unknown>)
      : undefined;
    if (d.platform === 'youtube' && platformOptions) {
      payload.youTubeOptions = platformOptions;
    }
    if (d.platform === 'tiktok' && platformOptions) {
      payload.tikTokOptions = platformOptions;
    }
    if (d.platform === 'linkedin' && platformOptions) {
      payload.linkedInOptions = platformOptions;
    }
    if (d.platform === 'instagram' && platformOptions) {
      payload.instagramOptions = platformOptions;
    }
    if (d.platform === 'facebook' && platformOptions) {
      payload.faceBookOptions = platformOptions;
    }
    if (d.platform === 'snapchat' && platformOptions) {
      payload.snapChatOptions = platformOptions;
    }

    let profileKey: string | undefined;
    if (publication.ayrshareProfileId) {
      profileKey = await this.ayrshareProfiles.getProfileKeyByIdOnly(
        publication.ayrshareProfileId,
      );
    } else {
      const workspaceId = this.userRequest.workspaceId;
      if (workspaceId) {
        profileKey =
          (await this.ayrshareProfiles.getFirstProfileKeyForWorkspace(
            workspaceId,
          )) ?? undefined;
      }
    }
    if (!profileKey) {
      throw new BadRequestException(
        'No Ayrshare profile is set for this publication and the workspace has no profile. ' +
          'Create a publication with an Ayrshare profile selected, or add a profile (POST /repurposing/ayrshare/profiles).',
      );
    }

    const response = await this.ayrshare.publishPost(
      payload as Parameters<AyrshareRepository['publishPost']>[0],
      profileKey,
    );

    const postIds = response.postIds ?? [];
    const platformEntry = postIds.find((p) => p.platform === d.platform);
    const platformStatus = platformEntry?.status;
    const platformPostIdValue = platformEntry?.id ?? null;
    const isPlatformPending =
      platformStatus === 'pending' || platformPostIdValue === 'pending';
    const status =
      response.status === 'error' || platformStatus === 'failed'
        ? 'error'
        : response.status === 'success' && !isPlatformPending
          ? 'success'
          : 'pending';
    const errorMessage = response.errors?.length
      ? response.errors.join('; ')
      : platformEntry?.error ?? null;
    const postUrl = platformEntry?.postUrl ?? platformEntry?.post_url ?? null;
    const ayrsharePostId = response.id ?? null;

    const updated = await this.prisma.distribution.update({
      where: { id },
      data: {
        status,
        ayrsharePostId,
        platformPostId: platformPostIdValue,
        postUrl,
        errorMessage,
        publishedAt: status === 'success' ? new Date() : null,
      },
    });

    if (status === 'success' && publication.scheduledAt) {
      await this.prisma.publication.update({
        where: { id: publication.id },
        data: { scheduledAt: null },
      });
    }

    return updated;
  }

  async refreshAyrshareStatusForPublication(publicationId: string): Promise<void> {
    const publication = await this.prisma.publication.findUnique({
      where: { id: publicationId },
      include: { distributions: true },
    });
    if (!publication) {
      throw new NotFoundException(`Publication ${publicationId} not found`);
    }
    const toRefresh = publication.distributions.filter(
      (d): d is typeof d & { ayrsharePostId: string } =>
        !!d.ayrsharePostId && d.ayrsharePostId.trim() !== '',
    );
    let profileKey: string | undefined;
    if (publication.ayrshareProfileId) {
      try {
        profileKey = await this.ayrshareProfiles.getProfileKeyByIdOnly(
          publication.ayrshareProfileId,
        );
      } catch {
        // continue
      }
    }
    if (!profileKey && this.userRequest.workspaceId) {
      profileKey =
        (await this.ayrshareProfiles.getFirstProfileKeyForWorkspace(
          this.userRequest.workspaceId,
        )) ?? undefined;
    }
    await Promise.all(
      toRefresh.map(async (d) => {
        try {
          const response = await this.ayrshare.getPostStatus(
            d.ayrsharePostId,
            profileKey,
          );
          const postIds = response.postIds ?? [];
          const platformLower = (d.platform ?? '').toLowerCase();
          const platformEntry = postIds.find(
            (p) => (p.platform ?? '').toLowerCase() === platformLower,
          );
          const platformStatus = platformEntry?.status;
          const platformPostIdValue = platformEntry?.id ?? null;
          const isPlatformPending =
            platformStatus === 'pending' || platformPostIdValue === 'pending';
          const status =
            response.status === 'error' || platformStatus === 'failed'
              ? 'error'
              : response.status === 'success' && !isPlatformPending
                ? 'success'
                : 'pending';
          const errorMessage = response.errors?.length
            ? response.errors.join('; ')
            : platformEntry?.error ?? null;
          const postUrl =
            platformEntry?.postUrl ?? platformEntry?.post_url ?? null;
          await this.prisma.distribution.update({
            where: { id: d.id },
            data: {
              status,
              platformPostId: platformPostIdValue,
              postUrl,
              errorMessage,
              ...(status === 'success' && { publishedAt: new Date() }),
            },
          });
          if (status === 'success') {
            await this.updateViewCountFromAyrshare(
              d.id,
              d.ayrsharePostId,
              d.platform,
              publication.ayrshareProfileId,
            );
          }
        } catch {
          // skip
        }
      }),
    );
  }

  /**
   * Handle incoming Ayrshare webhook (e.g. scheduled action when a post is published or fails).
   * Updates the distribution matching ayrsharePostId with status, postUrl, platformPostId, errorMessage.
   * On success, fetches post analytics and updates viewCount when available.
   * Returns ayrshareProfileId when the event can be linked to our profile (for webhook event storage).
   */
  async handleAyrshareWebhook(payload: {
    action?: string;
    status?: string;
    id?: string;
    postIds?: Array<{
      platform?: string;
      id?: string;
      postUrl?: string;
      post_url?: string;
      status?: string;
      error?: string;
    }>;
    errors?: string[];
    [key: string]: unknown;
  }): Promise<{ ayrshareProfileId?: string }> {
    if (payload.action !== 'scheduled' || !payload.id?.trim()) {
      return {};
    }
    const ayrsharePostId = payload.id.trim();
    const distribution = await this.prisma.distribution.findFirst({
      where: { ayrsharePostId },
      include: { publication: true },
    });
    if (!distribution) {
      return {};
    }
    const ayrshareProfileId =
      distribution.publication?.ayrshareProfileId ?? undefined;
    const postIds = payload.postIds ?? [];
    const platformLower = (distribution.platform ?? '').toLowerCase();
    const platformEntry = postIds.find(
      (p) => (p.platform ?? '').toLowerCase() === platformLower,
    );
    const platformStatus = platformEntry?.status;
    const platformPostIdValue = platformEntry?.id ?? null;
    const isPlatformPending =
      platformStatus === 'pending' || platformPostIdValue === 'pending';
    const status =
      payload.status === 'error' || platformStatus === 'failed'
        ? 'error'
        : payload.status === 'success' && !isPlatformPending
          ? 'success'
          : 'pending';
    const errorMessage = payload.errors?.length
      ? payload.errors.join('; ')
      : platformEntry?.error ?? null;
    const postUrl = platformEntry?.postUrl ?? platformEntry?.post_url ?? null;

    await this.prisma.distribution.update({
      where: { id: distribution.id },
      data: {
        status,
        platformPostId: platformPostIdValue,
        postUrl,
        errorMessage,
        ...(status === 'success' && { publishedAt: new Date() }),
      },
    });

    if (status === 'success') {
      await this.updateViewCountFromAyrshare(
        distribution.id,
        ayrsharePostId,
        distribution.platform,
        distribution.publication?.ayrshareProfileId ?? null,
      );
    }
    return ayrshareProfileId ? { ayrshareProfileId } : {};
  }

  /**
   * Fetch post analytics from Ayrshare and update distribution.viewCount.
   * Non-blocking: failures are ignored so webhook response is not delayed.
   */
  private async updateViewCountFromAyrshare(
    distributionId: string,
    ayrsharePostId: string,
    platform: string,
    ayrshareProfileId: string | null,
  ): Promise<void> {
    let profileKey: string | undefined;
    if (ayrshareProfileId) {
      try {
        profileKey = await this.ayrshareProfiles.getProfileKeyByIdOnly(
          ayrshareProfileId,
        );
      } catch {
        // no profile, try without (primary profile)
      }
    }
    try {
      const analytics = await this.ayrshare.getPostAnalytics(
        ayrsharePostId,
        [platform],
        profileKey,
      );
      const views = analytics[platform]?.views;
      if (typeof views === 'number' && !Number.isNaN(views)) {
        await this.prisma.distribution.update({
          where: { id: distributionId },
          data: { viewCount: views },
        });
      }
    } catch {
      // Analytics may be unavailable immediately after publish; ignore
    }
  }
}
