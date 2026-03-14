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
export declare class AyrshareRepository {
    private readonly client;
    private readonly logger;
    constructor();
    private requireApiKey;
    publishPost(params: AyrsharePublishParams, profileKey?: string): Promise<AyrsharePostResponse>;
    getPostStatus(ayrsharePostId: string, profileKey?: string): Promise<AyrsharePostResponse>;
    deletePost(ayrsharePostId: string, profileKey?: string): Promise<{
        status: string;
    }>;
    getPostAnalytics(ayrsharePostId: string, platforms: string[], profileKey?: string): Promise<Record<string, {
        views?: number;
    }>>;
    private extractViewsFromAnalytics;
    getUserProfile(profileKey: string): Promise<AyrshareUserProfileResponse>;
    getSocialAnalytics(platforms: string[], options?: {
        daily?: boolean;
        quarters?: number;
    }, profileKey?: string): Promise<Record<string, unknown>>;
}
