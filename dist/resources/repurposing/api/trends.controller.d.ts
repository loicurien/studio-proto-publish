import { TrendsRepository } from '../spi/trends.repository';
import { DistributionService } from '../domain/distribution.service';
export declare class TrendsController {
    private readonly trends;
    private readonly distributionService;
    constructor(trends: TrendsRepository, distributionService: DistributionService);
    getTrendingHashtags(limitStr?: string): Promise<{
        hashtags: string[];
        error?: string;
    }>;
    getTopViewedHashtags(limitStr?: string): Promise<{
        items: {
            tag: string;
            views: number;
        }[];
        error?: string;
    }>;
}
