export interface TrendingHashtagsResult {
    hashtags: string[];
    error?: string;
}
export declare class TrendsRepository {
    getTrendingHashtags(_limit?: number): Promise<TrendingHashtagsResult>;
}
