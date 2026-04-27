import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DistributionService } from './distribution.service';

/**
 * Refresh Ayrshare post analytics hourly so the UI can rely on DB counters
 * (Distribution.viewCount/likeCount/shareCount) without needing user traffic
 * to trigger background refresh.
 */
@Injectable()
export class AyrshareMetricsRefreshJob {
  private readonly logger = new Logger(AyrshareMetricsRefreshJob.name);

  constructor(private readonly distributions: DistributionService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async refreshHourly(): Promise<void> {
    try {
      const refreshed = await this.distributions.refreshRecentAyrshareMetrics({
        maxCandidates: 200,
      });
      this.logger.log(`[Ayrshare] hourly refresh done refreshed=${refreshed}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[Ayrshare] hourly refresh failed: ${msg}`);
    }
  }
}

