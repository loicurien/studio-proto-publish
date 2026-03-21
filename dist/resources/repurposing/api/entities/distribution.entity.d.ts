export declare class CreateDistributionDto {
    platform: string;
    postText?: string;
    mediaUrls?: string[];
    scheduledAt?: string;
    platformOptions?: Record<string, unknown>;
    preferredFormat?: string;
    hashtags?: string[];
}
export declare class UpdateDistributionDto {
    postText?: string;
    mediaUrls?: string[];
    scheduledAt?: string;
    platformOptions?: Record<string, unknown>;
    hashtags?: string[];
}
export declare class DistributionResponseDto {
    id: string;
    publicationId: string;
    platform: string;
    status: string;
    ayrsharePostId?: string;
    platformPostId?: string;
    postUrl?: string;
    errorMessage?: string;
    scheduledAt?: string;
    publishedAt?: string;
    postText?: string;
    mediaUrls?: string[];
    platformOptions?: Record<string, unknown>;
    hashtags?: string[];
    preferredFormat?: string;
    viewCount?: number;
    likeCount?: number;
    shareCount?: number;
    commentCount?: number;
    createdAt: string;
    updatedAt: string;
    static from(d: {
        id: string;
        publicationId: string;
        platform: string;
        status: string;
        ayrsharePostId?: string | null;
        platformPostId?: string | null;
        postUrl?: string | null;
        errorMessage?: string | null;
        scheduledAt?: Date | null;
        publishedAt?: Date | null;
        postText?: string | null;
        mediaUrls?: string | null;
        platformOptions?: string | null;
        hashtags?: string | null;
        preferredFormat?: string | null;
        viewCount?: number | null;
        likeCount?: number | null;
        shareCount?: number | null;
        commentCount?: number | null;
        createdAt: Date;
        updatedAt: Date;
    }): DistributionResponseDto;
}
