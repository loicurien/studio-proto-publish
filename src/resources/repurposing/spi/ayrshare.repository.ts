import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

const AYRSHARE_BASE_URL = 'https://api.ayrshare.com/api';

function redactApiKey(key: string | undefined): string {
  if (!key || key.length < 12) return key ? '***' : '(none)';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
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

@Injectable()
export class AyrshareRepository {
  private readonly client: AxiosInstance;
  private readonly logger = new Logger(AyrshareRepository.name);

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
  ): Promise<Record<string, { views?: number }>> {
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
    const result: Record<string, { views?: number }> = {};
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
      if (views != null) result[platform] = { views };
    }
    return result;
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
}
