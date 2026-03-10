import { DistributionResponseDto } from './distribution.entity';
export declare class CreatePublicationDto {
    title: string;
    description?: string;
    postText?: string;
    mediaUrls?: string[];
    mediaUrlsByFormat?: Record<string, string[]>;
    scheduledAt?: string;
    ayrshareProfileId?: string;
}
export declare class UpdatePublicationDto {
    title?: string;
    description?: string;
    postText?: string;
    mediaUrls?: string[];
    scheduledAt?: string;
    ayrshareProfileId?: string;
}
export declare class PublicationResponseDto {
    id: string;
    title: string;
    description?: string;
    postText?: string;
    mediaUrls?: string[];
    scheduledAt?: string;
    ayrshareProfileId?: string;
    distributions?: DistributionResponseDto[];
    createdAt: string;
    updatedAt: string;
    static from(p: {
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
    }, includeDistributions?: boolean): PublicationResponseDto;
}
