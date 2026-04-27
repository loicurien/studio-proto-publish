import { Body, Controller, Headers, Post } from '@nestjs/common';
import { DistributionService } from '../domain/distribution.service';

type RefreshMetricsBody = {
  maxCandidates?: number;
  concurrency?: number;
};

@Controller('repurposing/admin')
export class AdminController {
  constructor(private readonly distributions: DistributionService) {}

  /**
   * Manual trigger for the hourly cron job refreshing Ayrshare metrics.
   *
   * Auth:
   * - If env var ADMIN_TOKEN is set, require header `x-admin-token` to match.
   * - If ADMIN_TOKEN is not set, the endpoint is open (intended for local/dev).
   */
  @Post('refresh-metrics')
  async refreshMetrics(
    @Body() body: RefreshMetricsBody,
    @Headers('x-admin-token') token?: string,
  ): Promise<{ attempted: number }> {
    const expected = process.env.ADMIN_TOKEN;
    if (expected && token !== expected) {
      throw new Error('Unauthorized');
    }
    const attempted = await this.distributions.refreshRecentAyrshareMetrics({
      maxCandidates: body?.maxCandidates,
      concurrency: body?.concurrency,
    });
    return { attempted };
  }
}

