import { PublicationService } from '../domain/publication.service';
import { DistributionService } from '../domain/distribution.service';
import { UrlPresignerService } from '../../../common/url-presigner/url-presigner.service';
import { CreatePublicationDto, PublicationResponseDto, UpdatePublicationDto } from './entities/publication.entity';
import { SuggestContentRequestDto, SuggestContentResponseDto } from './entities/suggest-content.entity';
export declare class PublicationsController {
    private readonly publicationService;
    private readonly distributionService;
    private readonly urlPresigner;
    constructor(publicationService: PublicationService, distributionService: DistributionService, urlPresigner: UrlPresignerService);
    suggestContent(dto: SuggestContentRequestDto): Promise<SuggestContentResponseDto>;
    list(limitStr?: string, offsetStr?: string): Promise<PublicationResponseDto[]>;
    refreshAyrshareStatus(id: string): Promise<PublicationResponseDto>;
    getOne(id: string): Promise<PublicationResponseDto>;
    sendToReview(id: string): Promise<PublicationResponseDto>;
    approveReview(id: string): Promise<PublicationResponseDto>;
    private withPresignedMediaUrls;
    create(dto: CreatePublicationDto): Promise<PublicationResponseDto>;
    update(id: string, dto: UpdatePublicationDto): Promise<PublicationResponseDto>;
    remove(id: string): Promise<void>;
}
