export class CreateDistributionDto {
  platform!: string;
  postText?: string;
  mediaUrls?: string[];
  scheduledAt?: string;
  platformOptions?: Record<string, unknown>;
  preferredFormat?: string;
  hashtags?: string[];
}

export class UpdateDistributionDto {
  postText?: string;
  mediaUrls?: string[];
  scheduledAt?: string;
  platformOptions?: Record<string, unknown>;
  hashtags?: string[];
}

export class DistributionResponseDto {
  id!: string;
  publicationId!: string;
  platform!: string;
  status!: string;
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
  createdAt!: string;
  updatedAt!: string;

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
  }): DistributionResponseDto {
    const dto = new DistributionResponseDto();
    dto.id = d.id;
    dto.publicationId = d.publicationId;
    dto.platform = d.platform;
    dto.status = d.status;
    dto.ayrsharePostId = d.ayrsharePostId ?? undefined;
    dto.platformPostId = d.platformPostId ?? undefined;
    dto.postUrl = d.postUrl ?? undefined;
    dto.errorMessage = d.errorMessage ?? undefined;
    dto.scheduledAt = d.scheduledAt?.toISOString();
    dto.publishedAt = d.publishedAt?.toISOString();
    dto.postText = d.postText ?? undefined;
    dto.mediaUrls = d.mediaUrls ? (JSON.parse(d.mediaUrls) as string[]) : undefined;
    dto.platformOptions = d.platformOptions
      ? (JSON.parse(d.platformOptions) as Record<string, unknown>)
      : undefined;
    dto.hashtags = d.hashtags ? (JSON.parse(d.hashtags) as string[]) : undefined;
    dto.preferredFormat = d.preferredFormat ?? undefined;
    dto.viewCount = d.viewCount ?? undefined;
    dto.likeCount = d.likeCount ?? undefined;
    dto.shareCount = d.shareCount ?? undefined;
    dto.commentCount = d.commentCount ?? undefined;
    dto.createdAt = d.createdAt.toISOString();
    dto.updatedAt = d.updatedAt.toISOString();
    return dto;
  }
}
