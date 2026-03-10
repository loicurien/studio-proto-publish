import { DistributionResponseDto } from './distribution.entity';

export class CreatePublicationDto {
  title!: string;
  description?: string;
  postText?: string;
  mediaUrls?: string[];
  mediaUrlsByFormat?: Record<string, string[]>;
  scheduledAt?: string;
  ayrshareProfileId?: string;
}

export class UpdatePublicationDto {
  title?: string;
  description?: string;
  postText?: string;
  mediaUrls?: string[];
  scheduledAt?: string;
  ayrshareProfileId?: string;
}

export class PublicationResponseDto {
  id!: string;
  title!: string;
  description?: string;
  postText?: string;
  mediaUrls?: string[];
  scheduledAt?: string;
  ayrshareProfileId?: string;
  distributions?: DistributionResponseDto[];
  createdAt!: string;
  updatedAt!: string;

  static from(
    p: {
      id: string;
      title: string;
      description?: string | null;
      postText?: string | null;
      mediaUrls?: string | null;
      scheduledAt?: Date | null;
      ayrshareProfileId?: string | null;
      createdAt: Date;
      updatedAt: Date;
      distributions?: Array<{
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
        createdAt: Date;
        updatedAt: Date;
      }>;
    },
    includeDistributions = true,
  ): PublicationResponseDto {
    const dto = new PublicationResponseDto();
    dto.id = p.id;
    dto.title = p.title;
    dto.description = p.description ?? undefined;
    dto.postText = p.postText ?? undefined;
    dto.mediaUrls = p.mediaUrls ? (JSON.parse(p.mediaUrls) as string[]) : undefined;
    dto.scheduledAt = p.scheduledAt?.toISOString();
    dto.ayrshareProfileId = p.ayrshareProfileId ?? undefined;
    dto.createdAt = p.createdAt.toISOString();
    dto.updatedAt = p.updatedAt.toISOString();
    if (includeDistributions && p.distributions) {
      dto.distributions = p.distributions.map((d) => DistributionResponseDto.from(d));
    }
    return dto;
  }
}
