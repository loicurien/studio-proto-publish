import { DistributionService } from '../domain/distribution.service';
import { CreateDistributionDto, DistributionResponseDto, UpdateDistributionDto } from './entities/distribution.entity';
export declare class DistributionsController {
    private readonly distributionService;
    constructor(distributionService: DistributionService);
    listByPublication(publicationId: string): Promise<DistributionResponseDto[]>;
    getOne(id: string): Promise<DistributionResponseDto>;
    create(publicationId: string, dto: CreateDistributionDto): Promise<DistributionResponseDto>;
    publish(id: string): Promise<DistributionResponseDto>;
    update(id: string, dto: UpdateDistributionDto): Promise<DistributionResponseDto>;
    remove(id: string): Promise<void>;
}
