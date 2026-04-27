import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PublicationService } from '../domain/publication.service';
import { DistributionService } from '../domain/distribution.service';
import { UrlPresignerService } from '../../../common/url-presigner/url-presigner.service';
import { AyrshareProfileService } from '../domain/ayrshare-profile.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';
import {
  UserRequestCredentialsService,
  WORKSPACE_ID_HEADER,
} from '../../../common/http-client/user-request-credentials.service';
import {
  CreatePublicationDto,
  PublicationResponseDto,
  UpdatePublicationDto,
} from './entities/publication.entity';
import {
  SuggestContentRequestDto,
  SuggestContentResponseDto,
} from './entities/suggest-content.entity';

function numFromUnknown(v: unknown): number {
  return typeof v === 'number' && !Number.isNaN(v) ? v : 0;
}

/**
 * Sums a metric's `total` if present, otherwise sums time-series `values` entries
 * (Ayrshare/Instagram may expose `values: [{ value: n }, ...]` without `total`).
 */
function sumMetricTotalOrSeries(
  m: unknown,
  num: (v: unknown) => number = numFromUnknown,
): number {
  if (m == null || typeof m !== 'object') return 0;
  const o = m as Record<string, unknown>;
  const t = num(o.total);
  if (t > 0) return t;
  const values = o.values;
  if (!Array.isArray(values)) return 0;
  let sum = 0;
  for (const row of values) {
    if (row != null && typeof row === 'object') {
      const r = row as Record<string, unknown>;
      const v1 = num(r.value);
      if (v1 > 0) {
        sum += v1;
      } else {
        const inner = r.values;
        if (Array.isArray(inner)) {
          for (const n of inner) {
            if (typeof n === 'number' && !Number.isNaN(n)) sum += n;
          }
        }
      }
    } else if (typeof row === 'number' && !Number.isNaN(row)) {
      sum += row;
    }
  }
  return sum;
}

function normalizeAyrsharePlatformId(p: string | undefined | null): string {
  if (p == null) return '';
  if (p === 'gmb') return 'googlebusiness';
  if (p === 'ig') return 'instagram';
  return p.toLowerCase();
}

@Controller('repurposing/publications')
export class PublicationsController {
  constructor(
    private readonly publicationService: PublicationService,
    private readonly distributionService: DistributionService,
    private readonly urlPresigner: UrlPresignerService,
    private readonly ayrshareProfiles: AyrshareProfileService,
    private readonly ayrshare: AyrshareRepository,
    private readonly userRequest: UserRequestCredentialsService,
  ) {}

  @Post('suggest-content')
  async suggestContent(
    @Body() dto: SuggestContentRequestDto,
  ): Promise<SuggestContentResponseDto> {
    return this.publicationService.suggestContent(dto.prompt);
  }

  @Get()
  async list(
    @Query('limit') limitStr?: string,
    @Query('offset') offsetStr?: string,
  ): Promise<PublicationResponseDto[]> {
    const limit = limitStr ? parseInt(limitStr, 10) : 25;
    const offset = offsetStr ? parseInt(offsetStr, 10) : 0;
    const list = await this.publicationService.findAll(limit, offset);
    return Promise.all(list.map((p) => this.withPresignedMediaUrls(p)));
  }

  /**
   * Lifetime totals (views / likes / shares) across all published
   * distributions, aggregated per platform. Uses persisted Ayrshare counters
   * so the response is fast and decoupled from the daily time-series used
   * by charts (no date window). Triggers a background refresh from Ayrshare
   * so subsequent calls see fresher numbers.
   */
  @Get('stats/totals')
  async getLifetimeTotals(): Promise<{
    totalViews: number;
    totalLikes: number;
    totalShares: number;
    byPlatform: Record<
      string,
      {
        views: number;
        likes: number;
        shares: number;
        distributionCount: number;
      }
    >;
  }> {
    return this.distributionService.getLifetimeTotals({ refresh: true });
  }

  /**
   * Social (account-level) totals by platform.
   *
   * This endpoint intentionally ignores the chart time window (7/15/30/60 days)
   * and returns the totals as provided by social platforms through Ayrshare
   * social analytics (e.g. TikTok `viewCountTotal`).
   *
   * It exists because some platforms (notably TikTok) may not provide a reliable
   * daily time-series through social analytics, while the totals shown in
   * native dashboards are still available as aggregate counters.
   */
  @Get('stats/social-totals')
  async getSocialTotals(): Promise<{
    totalViews: number;
    totalLikes: number;
    totalShares: number;
    byPlatform: Record<
      string,
      { views: number; likes: number; shares: number; distributionCount: number }
    >;
  }> {
    const workspaceId = this.userRequest.workspaceId;
    if (!workspaceId) {
      throw new Error(`${WORKSPACE_ID_HEADER} header is required`);
    }
    const profiles = await this.ayrshareProfiles.listProfilesForWorkspace(
      workspaceId,
    );
    const first = profiles[0];
    if (!first) {
      return { totalViews: 0, totalLikes: 0, totalShares: 0, byPlatform: {} };
    }
    const profileKey = first.profileKey;
    const active = await this.ayrshare.getUserProfile(profileKey);
    const activePlatforms = [
      ...new Set(
        ((active.activeSocialAccounts ?? []) as string[]).map(
          normalizeAyrsharePlatformId,
        ),
      ),
    ].filter(Boolean);
    const platforms = activePlatforms.length
      ? activePlatforms
      : ['facebook', 'instagram', 'tiktok', 'youtube'];
    const raw = await this.ayrshare.getSocialAnalytics(
      platforms,
      { aggregate: true },
      profileKey,
    );

    const num = (v: unknown): number =>
      typeof v === 'number' && !Number.isNaN(v) ? v : 0;
    const fromSocial: Record<
      string,
      { views: number; likes: number; shares: number; distributionCount: number }
    > = {};

    for (const platform of platforms) {
      let pl = raw?.[platform] as Record<string, unknown> | undefined;
      if (pl == null && platform === 'instagram') {
        pl = raw?.ig as Record<string, unknown> | undefined;
      }
      const analytics = (pl?.analytics as Record<string, unknown>) ?? pl ?? {};
      const reachT = num(
        (analytics.reach as { total?: unknown } | undefined)?.total,
      );
      const impT = num(
        (analytics.impressions as { total?: unknown } | undefined)?.total,
      );
      const reachS = sumMetricTotalOrSeries(analytics.reach, num);
      const impS = sumMetricTotalOrSeries(analytics.impressions, num);
      const views = Math.max(
        num(analytics.viewCountTotal) ||
          num(analytics.views) ||
          num(
            (analytics.pageMediaView as { total?: unknown } | undefined)?.total,
          ),
        reachS,
        impS,
        reachT,
        impT,
      );
      const likes =
        num(analytics.likeCountTotal) ||
        num(analytics.likes) ||
        num(analytics.likeCount);
      const shares =
        num(analytics.shareCountTotal) ||
        num(analytics.shares) ||
        num(analytics.shareCount);

      if (views <= 0 && likes <= 0 && shares <= 0) continue;
      fromSocial[platform] = {
        views: Math.round(views),
        likes: Math.round(likes),
        shares: Math.round(shares),
        distributionCount: 0,
      };
    }

    const db = await this.distributionService.getLifetimeTotals({
      refresh: false,
    });
    const byPlatform: Record<
      string,
      { views: number; likes: number; shares: number; distributionCount: number }
    > = {};
    const platformKeys = new Set([
      ...Object.keys(fromSocial),
      ...Object.keys(db.byPlatform),
    ]);
    for (const platform of platformKeys) {
      const a = fromSocial[platform];
      const b = db.byPlatform[platform];
      const views = Math.max(a?.views ?? 0, b?.views ?? 0);
      const likes = Math.max(a?.likes ?? 0, b?.likes ?? 0);
      const shares = Math.max(a?.shares ?? 0, b?.shares ?? 0);
      if (views <= 0 && likes <= 0 && shares <= 0) continue;
      byPlatform[platform] = {
        views: Math.round(views),
        likes: Math.round(likes),
        shares: Math.round(shares),
        distributionCount: b?.distributionCount ?? 0,
      };
    }

    let totalViews = 0;
    let totalLikes = 0;
    let totalShares = 0;
    for (const p of Object.values(byPlatform)) {
      totalViews += p.views;
      totalLikes += p.likes;
      totalShares += p.shares;
    }

    return {
      totalViews: Math.round(totalViews),
      totalLikes: Math.round(totalLikes),
      totalShares: Math.round(totalShares),
      byPlatform,
    };
  }

  /**
   * Most viewed posts by live Ayrshare view count (one card per distribution).
   */
  @Get('most-viewed/ayrshare')
  async getMostViewedFromAyrshare(
    @Query('limit') limitStr?: string,
  ): Promise<{ items: PublicationResponseDto[] }> {
    const limit = limitStr
      ? Math.min(20, parseInt(limitStr, 10) || 12)
      : 12;
    const rows =
      await this.distributionService.getMostViewedFromAyrshare(limit);
    const items = await Promise.all(
      rows.map(({ publication, distribution, viewCount }) =>
        this.withPresignedMediaUrls({
          ...publication,
          distributions: [{ ...distribution, viewCount }],
        }),
      ),
    );
    return { items };
  }

  /**
   * Most viewed publications by aggregated DB viewCount (sum across platforms).
   *
   * Notes:
   * - Reads persisted counters (Distribution.viewCount) for speed.
   * - Use the hourly cron / admin trigger to keep counters fresh.
   */
  @Get('most-viewed/publication')
  async getMostViewedPublications(
    @Query('limit') limitStr?: string,
  ): Promise<{ items: PublicationResponseDto[] }> {
    const limit = limitStr
      ? Math.min(20, parseInt(limitStr, 10) || 12)
      : 12;
    const pubs =
      await this.distributionService.getMostViewedPublicationsByDbViews(limit);
    const items = await Promise.all(
      pubs.map((p) => this.withPresignedMediaUrls(p)),
    );
    return { items };
  }

  @Get(':id/refresh-ayrshare-status')
  async refreshAyrshareStatus(
    @Param('id') id: string,
  ): Promise<PublicationResponseDto> {
    await this.distributionService.refreshAyrshareStatusForPublication(id);
    const p = await this.publicationService.findOne(id);
    return this.withPresignedMediaUrls(p);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<PublicationResponseDto> {
    const p = await this.publicationService.findOne(id);
    return this.withPresignedMediaUrls(p);
  }

  @Post(':id/send-to-review')
  async sendToReview(@Param('id') id: string): Promise<PublicationResponseDto> {
    await this.distributionService.markPublicationForReview(id);
    const p = await this.publicationService.findOne(id);
    return this.withPresignedMediaUrls(p);
  }

  @Post(':id/approve-review')
  async approveReview(@Param('id') id: string): Promise<PublicationResponseDto> {
    await this.distributionService.approvePublicationReview(id);
    const p = await this.publicationService.findOne(id);
    return this.withPresignedMediaUrls(p);
  }

  private async withPresignedMediaUrls(
    p: Awaited<ReturnType<PublicationService['findOne']>>,
  ): Promise<PublicationResponseDto> {
    const pubMediaByFormat = p.mediaUrlsByFormat
      ? (JSON.parse(p.mediaUrlsByFormat) as Record<string, string[]>)
      : undefined;
    const pubMediaUrls = p.mediaUrls
      ? (JSON.parse(p.mediaUrls) as string[])
      : [];

    const presign = async (url: string): Promise<string> => {
      const signed = await this.urlPresigner.presignUrl(url);
      return signed ?? url;
    };

    try {
      const presignedPubUrls =
        pubMediaUrls.length > 0
          ? await Promise.all(pubMediaUrls.map(presign))
          : [];
      const pWithPresignedPub = {
        ...p,
        mediaUrls:
          presignedPubUrls.length > 0
            ? JSON.stringify(presignedPubUrls)
            : p.mediaUrls,
      };

      const distributions = await Promise.all(
        p.distributions.map(async (d) => {
          let raw: string[] = d.mediaUrls
            ? (JSON.parse(d.mediaUrls) as string[])
            : [];
          if (
            raw.length === 0 &&
            d.preferredFormat &&
            pubMediaByFormat?.[d.preferredFormat]?.length
          ) {
            raw = pubMediaByFormat[d.preferredFormat];
          }
          if (raw.length === 0 && pubMediaUrls.length > 0) {
            raw = pubMediaUrls;
          }
          const presigned =
            raw.length > 0 ? await Promise.all(raw.map(presign)) : [];
          return {
            ...d,
            mediaUrls:
              presigned.length > 0 ? JSON.stringify(presigned) : d.mediaUrls,
          };
        }),
      );

      return PublicationResponseDto.from(
        { ...pWithPresignedPub, distributions },
        true,
      );
    } catch {
      return PublicationResponseDto.from(p, true);
    }
  }

  @Post()
  async create(
    @Body() dto: CreatePublicationDto,
  ): Promise<PublicationResponseDto> {
    const p = await this.publicationService.create({
      title: dto.title,
      description: dto.description,
      postText: dto.postText,
      mediaUrls: dto.mediaUrls,
      mediaUrlsByFormat: dto.mediaUrlsByFormat,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      ayrshareProfileId: dto.ayrshareProfileId,
    });
    return PublicationResponseDto.from(p, false);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePublicationDto,
  ): Promise<PublicationResponseDto> {
    const p = await this.publicationService.update(id, {
      title: dto.title,
      description: dto.description,
      postText: dto.postText,
      mediaUrls: dto.mediaUrls,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      ayrshareProfileId: dto.ayrshareProfileId,
    });
    return PublicationResponseDto.from(p, false);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.publicationService.remove(id);
  }
}
