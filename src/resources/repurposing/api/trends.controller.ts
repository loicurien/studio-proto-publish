import { Controller, Get, Query } from '@nestjs/common';
import { TrendsRepository } from '../spi/trends.repository';
import { DistributionService } from '../domain/distribution.service';

@Controller('repurposing/trends')
export class TrendsController {
  constructor(
    private readonly trends: TrendsRepository,
    private readonly distributionService: DistributionService,
  ) {}

  @Get('hashtags')
  async getTrendingHashtags(
    @Query('limit') limitStr?: string,
  ): Promise<{ hashtags: string[]; error?: string }> {
    const limit = limitStr
      ? Math.min(50, Math.max(1, parseInt(limitStr, 10) || 10))
      : 10;
    const result = await this.trends.getTrendingHashtags(limit);
    return {
      hashtags: result.hashtags,
      ...(result.error && { error: result.error }),
    };
  }

  @Get('hashtags-used')
  async getTopViewedHashtags(
    @Query('limit') limitStr?: string,
  ): Promise<{ items: { tag: string; views: number }[]; error?: string }> {
    const limit = limitStr
      ? Math.min(50, Math.max(1, parseInt(limitStr, 10) || 10))
      : 10;
    const result = await this.distributionService.getTopViewedHashtags(limit);
    return {
      items: result.items,
      ...(result.error && { error: result.error }),
    };
  }
}
