import { Injectable } from '@nestjs/common';

export interface TrendingHashtagsResult {
  hashtags: string[];
  error?: string;
}

/** Stub: returns empty trending hashtags. Replace with TwitterAPI.io (or similar) when needed. */
@Injectable()
export class TrendsRepository {
  async getTrendingHashtags(_limit = 10): Promise<TrendingHashtagsResult> {
    return { hashtags: [] };
  }
}
