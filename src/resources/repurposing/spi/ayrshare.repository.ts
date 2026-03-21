import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, isAxiosError } from 'axios';

const AYRSHARE_BASE_URL = 'https://api.ayrshare.com/api';
const AYRSHARE_CACHE_TTL_MS = 60_000; // 1 minute

function redactApiKey(key: string | undefined): string {
  if (!key || key.length < 12) return key ? '***' : '(none)';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

/** Keep log lines bounded when Ayrshare returns large analytics payloads. */
function truncateForLog(json: string, maxChars = 14_000): string {
  if (json.length <= maxChars) return json;
  return `${json.slice(0, maxChars)}…[truncated ${json.length - maxChars} chars]`;
}

export interface AyrsharePublishParams {
  post: string;
  platforms: string[];
  mediaUrls?: string[];
  isVideo?: boolean;
  scheduleDate?: string;
  youTubeOptions?: {
    title?: string;
    description?: string;
    visibility?: string;
    shorts?: boolean;
  };
  tikTokOptions?: Record<string, unknown>;
  linkedInOptions?: Record<string, unknown>;
  instagramOptions?: Record<string, unknown>;
  faceBookOptions?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface AyrsharePostIdEntry {
  platform: string;
  id: string;
  postUrl?: string;
  post_url?: string;
  status?: string;
  error?: string;
}

export interface AyrsharePostResponse {
  status: string;
  id?: string;
  errors?: string[];
  postIds?: AyrsharePostIdEntry[];
  scheduleDate?: string;
}

export interface AyrshareUserProfileResponse {
  activeSocialAccounts?: string[];
  [key: string]: unknown;
}

type AyrshareErrorItem =
  | string
  | {
      message?: string;
      code?: number;
      details?: string;
      action?: string;
      status?: string;
    };

interface AyrsharePostApiResponse {
  status: string;
  validate?: boolean;
  posts?: Array<{
    id?: string;
    status?: string;
    errors?: AyrshareErrorItem[];
    postIds?: AyrsharePostIdEntry[];
  }>;
  id?: string;
  errors?: AyrshareErrorItem[];
  postIds?: AyrsharePostIdEntry[];
}

function normalizeAyrshareErrors(
  errors: AyrshareErrorItem[] | undefined,
): string[] {
  if (!errors?.length) return [];
  return errors
    .map((e) =>
      typeof e === 'string'
        ? e
        : (e?.message ??
          (e?.details ? `Error: ${e.details}` : null) ??
          JSON.stringify(e)),
    )
    .filter(Boolean);
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

@Injectable()
export class AyrshareRepository {
  private readonly client: AxiosInstance;
  private readonly logger = new Logger(AyrshareRepository.name);
  private readonly cache = new Map<string, CacheEntry<unknown>>();

  constructor() {
    const apiKey = process.env.AYRSHARE_API_KEY;
    this.client = axios.create({
      baseURL: AYRSHARE_BASE_URL,
      headers: {
        ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
        'Content-Type': 'application/json',
      },
    });
  }

  private requireApiKey(): void {
    if (!process.env.AYRSHARE_API_KEY) {
      throw new Error('AYRSHARE_API_KEY is not configured');
    }
  }

  private getCached<T>(key: string): T | undefined {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry || Date.now() >= entry.expiresAt) {
      if (entry) this.cache.delete(key);
      return undefined;
    }
    return entry.data;
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + AYRSHARE_CACHE_TTL_MS,
    });
  }

  async publishPost(
    params: AyrsharePublishParams,
    profileKey?: string,
  ): Promise<AyrsharePostResponse> {
    const apiKey = process.env.AYRSHARE_API_KEY;
    this.requireApiKey();
    this.logger.log(
      `[Ayrshare] Publish request apiKey=${redactApiKey(apiKey)} profileKey=${profileKey ? `${profileKey.slice(0, 8)}...` : '(none)'} platforms=${params.platforms?.join(',')}`,
    );
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (profileKey) {
      headers['Profile-Key'] = profileKey;
    }
    const body = profileKey ? { ...params, profileKey } : params;
    const { data } = await this.client.post<AyrsharePostApiResponse>(
      '/post',
      body,
      { headers },
    );
    const firstPost = data.posts?.[0];
    const rawErrors = firstPost?.errors?.length ? firstPost.errors : data.errors;
    const normalized: AyrsharePostResponse = firstPost
      ? {
          status: data.status,
          id: firstPost.id ?? data.id,
          errors: normalizeAyrshareErrors(rawErrors),
          postIds: firstPost.postIds ?? data.postIds,
        }
      : {
          status: data.status,
          id: data.id,
          errors: normalizeAyrshareErrors(data.errors),
          postIds: data.postIds,
        };
    this.logger.log(
      `[Ayrshare] Publish response status=${normalized.status} id=${normalized.id} postIds=${(normalized.postIds ?? []).map((p) => `${p.platform}:${p.id}`).join(',')}`,
    );
    return normalized;
  }

  async getPostStatus(
    ayrsharePostId: string,
    profileKey?: string,
  ): Promise<AyrsharePostResponse> {
    this.requireApiKey();
    const headers: Record<string, string> = {};
    if (profileKey) {
      headers['Profile-Key'] = profileKey;
    }
    const { data } = await this.client.get<
      AyrsharePostApiResponse | AyrsharePostResponse
    >(`/post/${ayrsharePostId}`, {
      headers: Object.keys(headers).length ? headers : undefined,
    });
    this.logger.log(
      `[Ayrshare] GET /post/${ayrsharePostId} raw=${truncateForLog(JSON.stringify(data))}`,
    );
    const withPosts = data as AyrsharePostApiResponse;
    const firstPost = withPosts.posts?.[0];
    const rawErrors =
      firstPost?.errors ?? (data as AyrsharePostApiResponse).errors;
    if (firstPost || (data as AyrsharePostApiResponse).posts) {
      return {
        status: withPosts.status,
        id: firstPost?.id ?? withPosts.id,
        errors: normalizeAyrshareErrors(rawErrors),
        postIds: firstPost?.postIds ?? (data as AyrsharePostResponse).postIds,
      };
    }
    return {
      status: data.status,
      id: data.id,
      errors: normalizeAyrshareErrors((data as AyrsharePostResponse).errors),
      postIds: (data as AyrsharePostResponse).postIds,
    };
  }

  async deletePost(
    ayrsharePostId: string,
    profileKey?: string,
  ): Promise<{ status: string }> {
    this.requireApiKey();
    const headers: Record<string, string> = {};
    if (profileKey) {
      headers['Profile-Key'] = profileKey;
    }
    const { data } = await this.client.delete<{ status: string }>('/post', {
      data: { id: ayrsharePostId },
      headers: Object.keys(headers).length ? headers : undefined,
    });
    return data;
  }

  async getPostAnalytics(
    ayrsharePostId: string,
    platforms: string[],
    profileKey?: string,
  ): Promise<Record<string, { views?: number; likes?: number }>> {
    const cacheKey = `analytics:post:v2:${ayrsharePostId}:${[...platforms].sort().join(',')}:${profileKey ?? ''}`;
    const cached = this.getCached<Record<string, { views?: number; likes?: number }>>(
      cacheKey,
    );
    if (cached !== undefined) return cached;

    this.requireApiKey();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (profileKey) {
      headers['Profile-Key'] = profileKey;
    }
    const platformsLower = platforms.map((p) => (p ?? '').toLowerCase());
    const { data } = await this.client.post<Record<string, unknown>>(
      '/analytics/post',
      { id: ayrsharePostId, platforms: platformsLower },
      { headers },
    );
    this.logger.log(
      `[Ayrshare] POST /analytics/post id=${ayrsharePostId} platforms=${platformsLower.join(',')} raw=${truncateForLog(JSON.stringify(data))}`,
    );
    const result: Record<string, { views?: number; likes?: number }> = {};
    const dataObj = data as Record<string, unknown>;
    for (const platform of platforms) {
      const responseKey = Object.keys(dataObj).find(
        (k) => k.toLowerCase() === (platform ?? '').toLowerCase(),
      );
      const pl = responseKey
        ? (dataObj[responseKey] as Record<string, unknown>)
        : undefined;
      if (!pl || typeof pl !== 'object') continue;
      const analytics = (pl.analytics as Record<string, unknown>) ?? pl;
      const views = this.extractViewsFromAnalytics(platform, analytics);
      const likes = this.extractLikesFromAnalytics(platform, analytics);
      if (views != null || likes != null) {
        result[platform] = {
          ...(views != null ? { views } : {}),
          ...(likes != null ? { likes } : {}),
        };
      }
    }
    this.setCache(cacheKey, result);
    this.logger.log(
      `[Ayrshare] POST /analytics/post id=${ayrsharePostId} parsed=${JSON.stringify(result)}`,
    );
    return result;
  }

  private extractLikesFromAnalytics(
    platform: string,
    analytics: Record<string, unknown>,
  ): number | undefined {
    const num = (v: unknown): number | undefined =>
      typeof v === 'number' && !Number.isNaN(v) ? v : undefined;
    const pl = platform.toLowerCase();
    if (pl === 'youtube') {
      return num(analytics.likes);
    }
    if (pl === 'tiktok') {
      return num(analytics.likeCount);
    }
    if (pl === 'instagram' || pl === 'facebook') {
      const reactions = analytics.reactions as Record<string, unknown> | undefined;
      const reactionTotal = num(reactions?.total);
      return num(analytics.likeCount) ?? reactionTotal;
    }
    if (pl === 'linkedin') {
      return num(analytics.likeCount);
    }
    if (pl === 'twitter' || pl === 'x') {
      const pubM = analytics.publicMetrics as Record<string, unknown> | undefined;
      const orgM = analytics.organicMetrics as Record<string, unknown> | undefined;
      return num(pubM?.likeCount) ?? num(orgM?.likeCount);
    }
    if (pl === 'threads') {
      return num(analytics.likes);
    }
    if (pl === 'bluesky') {
      return num(analytics.likeCount);
    }
    if (pl === 'pinterest') {
      return num(analytics.totalReactions);
    }
    if (pl === 'reddit') {
      return num(analytics.ups);
    }
    if (pl === 'snapchat') {
      return undefined;
    }
    return num(analytics.likeCount) ?? num(analytics.likes);
  }

  private extractViewsFromAnalytics(
    platform: string,
    analytics: Record<string, unknown>,
  ): number | undefined {
    const num = (v: unknown): number | undefined =>
      typeof v === 'number' && !Number.isNaN(v) ? v : undefined;
    const pl = platform.toLowerCase();
    if (pl === 'tiktok') {
      return (
        num(analytics.videoViews) ??
        num(analytics.reach) ??
        num(analytics.playCount) ??
        num((analytics as Record<string, unknown>).play_count) ??
        num(analytics.views) ??
        undefined
      );
    }
    if (pl === 'youtube') {
      return num(analytics.views);
    }
    if (pl === 'instagram' || pl === 'facebook' || pl === 'linkedin') {
      return (
        num(analytics.viewsCount) ??
        num(analytics.totalVideoViews) ??
        num(analytics.mediaView) ??
        num(analytics.views) ??
        undefined
      );
    }
    if (pl === 'twitter' || pl === 'x') {
      const video = analytics.video as Record<string, unknown> | undefined;
      return num(video?.viewCount) ?? num(analytics.views);
    }
    return num(analytics.views) ?? num(analytics.viewsCount);
  }

  async getUserProfile(
    profileKey: string,
  ): Promise<AyrshareUserProfileResponse> {
    this.requireApiKey();
    const { data } = await this.client.get<AyrshareUserProfileResponse>(
      '/user',
      {
        headers: {
          'Profile-Key': profileKey,
        },
      },
    );
    return data;
  }

  /**
   * Social (account-level) analytics. With daily: true returns daily time-series
   * for views/impressions (Facebook, Instagram, TikTok, YouTube).
   * @see https://www.ayrshare.com/docs/apis/analytics/social
   */
  async getSocialAnalytics(
    platforms: string[],
    options: { daily?: boolean; quarters?: number } = {},
    profileKey?: string,
  ): Promise<Record<string, unknown>> {
    const cacheKey = `analytics:social:${[...platforms].sort().join(',')}:${options.daily ?? ''}:${options.quarters ?? ''}:${profileKey ?? ''}`;
    const cached = this.getCached<Record<string, unknown>>(cacheKey);
    if (cached !== undefined) return cached;

    this.requireApiKey();
    const body: Record<string, unknown> = {
      platforms: platforms.map((p) => p.toLowerCase()),
    };
    if (options.daily === true) body.daily = true;
    if (options.quarters != null) body.quarters = options.quarters;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (profileKey) headers['Profile-Key'] = profileKey;
    try {
      const { data } = await this.client.post<Record<string, unknown>>(
        '/analytics/social',
        body,
        { headers },
      );
      const result = data ?? {};
      this.logger.log(
        `[Ayrshare] POST /analytics/social platforms=${body.platforms} daily=${body.daily === true} raw=${truncateForLog(JSON.stringify(result))}`,
      );
      this.setCache(cacheKey, result);
      return result;
    } catch (err) {
      if (isAxiosError(err)) {
        const status = err.response?.status;
        const resBody = err.response?.data as Record<string, unknown> | undefined;
        const message =
          typeof resBody?.message === 'string'
            ? resBody.message
            : Array.isArray(resBody?.errors)
              ? (resBody.errors as string[]).join('; ')
              : err.message ?? 'Ayrshare social analytics request failed';
        this.logger.warn(
          `[Ayrshare] getSocialAnalytics failed status=${status} message=${message}`,
        );
        throw new BadGatewayException(`Ayrshare analytics: ${message}`);
      }
      throw err;
    }
  }
}
