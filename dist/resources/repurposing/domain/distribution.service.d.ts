import { PrismaService } from '../../../prisma.service';
import { UrlPresignerService } from '../../../common/url-presigner/url-presigner.service';
import { UserRequestCredentialsService } from '../../../common/http-client/user-request-credentials.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';
import { AyrshareProfileService } from './ayrshare-profile.service';
import { Distribution, Publication } from '@prisma/client';
export interface CreateDistributionInput {
    platform: string;
    postText?: string;
    mediaUrls?: string[];
    scheduledAt?: Date;
    platformOptions?: Record<string, unknown>;
    preferredFormat?: string;
    hashtags?: string[];
}
export interface UpdateDistributionInput {
    postText?: string;
    mediaUrls?: string[];
    scheduledAt?: Date;
    platformOptions?: Record<string, unknown>;
    hashtags?: string[];
}
export declare class DistributionService {
    private readonly prisma;
    private readonly ayrshare;
    private readonly ayrshareProfiles;
    private readonly userRequest;
    private readonly urlPresigner;
    private readonly logger;
    constructor(prisma: PrismaService, ayrshare: AyrshareRepository, ayrshareProfiles: AyrshareProfileService, userRequest: UserRequestCredentialsService, urlPresigner: UrlPresignerService);
    findByPublicationId(publicationId: string): Promise<Distribution[]>;
    getTopViewedHashtags(limit?: number): Promise<{
        items: {
            tag: string;
            views: number;
        }[];
        error?: string;
    }>;
    findOne(id: string): Promise<Distribution>;
    create(publicationId: string, input: CreateDistributionInput): Promise<Distribution>;
    update(id: string, input: UpdateDistributionInput): Promise<Distribution>;
    remove(id: string): Promise<void>;
    markPublicationForReview(publicationId: string): Promise<void>;
    approvePublicationReview(publicationId: string): Promise<void>;
    private effective;
    publish(id: string): Promise<Distribution>;
    private normalizePublishError;
    refreshAyrshareStatusForPublication(publicationId: string): Promise<void>;
    handleAyrshareWebhook(payload: {
        action?: string;
        status?: string;
        id?: string;
        postIds?: Array<{
            platform?: string;
            id?: string;
            postUrl?: string;
            post_url?: string;
            status?: string;
            error?: string;
        }>;
        errors?: string[];
        [key: string]: unknown;
    }): Promise<{
        ayrshareProfileId?: string;
    }>;
    getLifetimeTotals(options?: {
        refresh?: boolean;
    }): Promise<{
        totalViews: number;
        totalLikes: number;
        totalShares: number;
        byPlatform: Record<string, {
            views: number;
            likes: number;
            shares: number;
            distributionCount: number;
        }>;
    }>;
    getMostViewedFromAyrshare(limit?: number): Promise<{
        publication: Publication & {
            distributions: Distribution[];
        };
        distribution: Distribution;
        viewCount: number;
    }[]>;
    private updatePostMetricsFromAyrshare;
}
