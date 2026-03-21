import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { UrlPresignerService } from '../../../common/url-presigner/url-presigner.service';
import { UserRequestCredentialsService } from '../../../common/http-client/user-request-credentials.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';
import { AyrshareProfileService } from './ayrshare-profile.service';
import { Distribution, Publication } from '@prisma/client';

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
  private readonly logger = new Logger(DistributionService.name);

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
        select: { hashtags: true, viewCount: true, likeCount: true },
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
    if (d.status !== 'draft' && d.status !== 'error') {
      throw new BadRequestException(
        `Distribution must be in draft or error status to publish (current: ${d.status})`,
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

    try {
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
      const errorParts = [...(response.errors ?? [])];
      if (platformEntry?.error?.trim() && !errorParts.includes(platformEntry.error.trim()))
        errorParts.push(platformEntry.error.trim());
      const errorMessage = errorParts.length ? errorParts.join('; ') : null;
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
    } catch (err: unknown) {
      const message = this.normalizePublishError(err);
      const updated = await this.prisma.distribution.update({
        where: { id },
        data: { status: 'error', errorMessage: message },
      });
      return updated;
    }
  }

  /**
   * Build an explicit, detailed error message from Ayrshare/axios errors
   * so the UI can show actionable feedback. Prioritizes Ayrshare's message/errors/details.
   */
  private normalizePublishError(err: unknown): string {
    const parts: string[] = [];

    if (err && typeof err === 'object' && 'response' in err) {
      const ax = err as {
        response?: { status?: number; data?: unknown };
        message?: string;
      };
      const status = ax.response?.status;
      const data = ax.response?.data;

      if (data != null && typeof data === 'object') {
        const obj = data as Record<string, unknown>;
        // Top-level message (e.g. Ayrshare "Invalid request")
        if (typeof obj.message === 'string' && obj.message.trim())
          parts.push(obj.message.trim());
        if (typeof obj.error === 'string' && obj.error.trim() && !parts.includes(obj.error.trim()))
          parts.push(obj.error.trim());
        // Ayrshare errors array: strings or { message, detail, details } per their docs
        if (Array.isArray(obj.errors) && obj.errors.length > 0) {
          const messages = obj.errors
            .map((e) => {
              if (typeof e === 'string') return e.trim() || null;
              if (e == null || typeof e !== 'object') return null;
              const o = e as Record<string, unknown>;
              const msg =
                typeof o.message === 'string'
                  ? o.message.trim()
                  : typeof o.detail === 'string'
                    ? o.detail.trim()
                    : typeof o.details === 'string'
                      ? o.details.trim()
                      : null;
              return msg || null;
            })
            .filter((s): s is string => typeof s === 'string' && s.length > 0);
          if (messages.length) parts.push(messages.join('; '));
        }
        // Nested posts[0].errors (same shape as top-level when API wraps response)
        const posts = obj.posts as unknown[] | undefined;
        const firstPost = Array.isArray(posts) && posts.length ? (posts[0] as Record<string, unknown>) : null;
        const nestedErrors = firstPost?.errors;
        if (Array.isArray(nestedErrors) && nestedErrors.length > 0 && parts.length === 0) {
          const messages = nestedErrors
            .map((e) => {
              if (typeof e === 'string') return e.trim() || null;
              if (e == null || typeof e !== 'object') return null;
              const o = e as Record<string, unknown>;
              return (
                (typeof o.message === 'string' && o.message.trim()) ||
                (typeof o.details === 'string' && o.details.trim()) ||
                (typeof o.detail === 'string' && o.detail.trim()) ||
                null
              );
            })
            .filter((s): s is string => typeof s === 'string' && s.length > 0);
          if (messages.length) parts.push(messages.join('; '));
        }
      }

      // Prepend HTTP status only when we have no API message, so Ayrshare message is shown first
      if (status != null && parts.length === 0) {
        const statusText =
          status === 400
            ? 'Bad request'
            : status === 401
              ? 'Unauthorized (check API key or profile)'
              : status === 403
                ? 'Forbidden (check account permissions)'
                : status === 404
                  ? 'Not found'
                  : status === 429
                    ? 'Too many requests (rate limit)'
                    : status >= 500
                      ? 'Server error'
                      : `HTTP ${status}`;
        parts.push(statusText);
      } else if (status != null && parts.length > 0 && !parts[0].toLowerCase().includes('http')) {
        parts.push(`(HTTP ${status})`);
      }
    }

    if (parts.length > 0) return parts.join(' – ');

    if (err instanceof Error && err.message?.trim())
      return err.message.trim();
    if (typeof err === 'string' && err.trim()) return err.trim();
    return 'Publish request failed. Check your connection and platform settings, then retry.';
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
    this.logger.log(
      `[Ayrshare] refresh publication=${publicationId} distributions=${toRefresh.length} profileKey=${profileKey ? `${profileKey.slice(0, 8)}…` : '(none)'}`,
    );
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
            await this.updatePostMetricsFromAyrshare(
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
      await this.updatePostMetricsFromAyrshare(
        distribution.id,
        ayrsharePostId,
        distribution.platform,
        distribution.publication?.ayrshareProfileId ?? null,
      );
    }
    return ayrshareProfileId ? { ayrshareProfileId } : {};
  }

  /**
   * Return most viewed items quickly from stored DB viewCount.
   * Then refresh Ayrshare analytics in background so next calls get fresh values.
   */
  async getMostViewedFromAyrshare(
    limit = 12,
  ): Promise<
    {
      publication: Publication & { distributions: Distribution[] };
      distribution: Distribution;
      viewCount: number;
    }[]
  > {
    const cap = Math.min(80, limit * 4);
    const rows = await this.prisma.distribution.findMany({
      where: { ayrsharePostId: { not: null } },
      include: { publication: { include: { distributions: true } } },
      orderBy: { updatedAt: 'desc' },
      take: cap,
    });
    // Fast path: use persisted counts so this endpoint stays responsive.
    const withViews = rows.map((d) => ({
      publication: d.publication as Publication & { distributions: Distribution[] },
      distribution: d,
      viewCount: d.viewCount ?? 0,
    }));

    // Background refresh: limited concurrency to reduce external API pressure.
    const refreshViewsInBackground = async (): Promise<void> => {
      const parallel = 6;
      for (let i = 0; i < rows.length; i += parallel) {
        const chunk = rows.slice(i, i + parallel);
        await Promise.allSettled(
          chunk.map((d) =>
            this.updatePostMetricsFromAyrshare(
              d.id,
              d.ayrsharePostId!,
              d.platform,
              d.publication.ayrshareProfileId,
            ),
          ),
        );
      }
    };
    void refreshViewsInBackground();

    const sorted = withViews.sort((a, b) => b.viewCount - a.viewCount);
    const nonZero = sorted.filter((x) => x.viewCount > 0);
    return (nonZero.length > 0 ? nonZero : sorted).slice(0, limit);
  }

  /**
   * Fetch post analytics from Ayrshare and update distribution.viewCount /
   * likeCount. Non-blocking: failures are ignored so webhook response is not
   * delayed.
   */
  private async updatePostMetricsFromAyrshare(
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
      const row = analytics[platform];
      const views = row?.views;
      const likes = row?.likes;
      const data: { viewCount?: number; likeCount?: number } = {};
      if (typeof views === 'number' && !Number.isNaN(views)) {
        data.viewCount = Math.round(views);
      }
      if (typeof likes === 'number' && !Number.isNaN(likes)) {
        data.likeCount = Math.round(likes);
      }
      this.logger.log(
        `[Ayrshare] metrics distribution=${distributionId} platform=${platform} ayrsharePostId=${ayrsharePostId} parsedRow=${JSON.stringify(row ?? null)} dbPatch=${JSON.stringify(data)}`,
      );
      if (Object.keys(data).length > 0) {
        await this.prisma.distribution.update({
          where: { id: distributionId },
          data,
        });
      } else {
        this.logger.warn(
          `[Ayrshare] metrics distribution=${distributionId} no view/like fields extracted (check raw analytics/post response above)`,
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(
        `[Ayrshare] metrics distribution=${distributionId} ayrsharePostId=${ayrsharePostId} failed: ${msg}`,
      );
    }
  }
}
