import { PublicationService } from '../domain/publication.service';
import { DistributionService } from '../domain/distribution.service';
import { UrlPresignerService } from '../../../common/url-presigner/url-presigner.service';
import { AyrshareProfileService } from '../domain/ayrshare-profile.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';
import { UserRequestCredentialsService } from '../../../common/http-client/user-request-credentials.service';
import { CreatePublicationDto, PublicationResponseDto, UpdatePublicationDto } from './entities/publication.entity';
import { SuggestContentRequestDto, SuggestContentResponseDto } from './entities/suggest-content.entity';
export declare class PublicationsController {
    private readonly publicationService;
    private readonly distributionService;
    private readonly urlPresigner;
    private readonly ayrshareProfiles;
    private readonly ayrshare;
    private readonly userRequest;
    constructor(publicationService: PublicationService, distributionService: DistributionService, urlPresigner: UrlPresignerService, ayrshareProfiles: AyrshareProfileService, ayrshare: AyrshareRepository, userRequest: UserRequestCredentialsService);
    suggestContent(dto: SuggestContentRequestDto): Promise<SuggestContentResponseDto>;
    list(limitStr?: string, offsetStr?: string): Promise<PublicationResponseDto[]>;
    getLifetimeTotals(): Promise<{
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
    getSocialTotals(): Promise<{
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
    getMostViewedFromAyrshare(limitStr?: string): Promise<{
        items: PublicationResponseDto[];
    }>;
    getMostViewedPublications(limitStr?: string): Promise<{
        items: PublicationResponseDto[];
    }>;
    refreshAyrshareStatus(id: string): Promise<PublicationResponseDto>;
    getOne(id: string): Promise<PublicationResponseDto>;
    sendToReview(id: string): Promise<PublicationResponseDto>;
    approveReview(id: string): Promise<PublicationResponseDto>;
    private withPresignedMediaUrls;
    create(dto: CreatePublicationDto): Promise<PublicationResponseDto>;
    update(id: string, dto: UpdatePublicationDto): Promise<PublicationResponseDto>;
    remove(id: string): Promise<void>;
}
