import { Module } from '@nestjs/common';
import { UrlPresignerModule } from '../../common/url-presigner/url-presigner.module';
import { HttpClientModule } from '../../common/http-client/http-client.module';
import { AyrshareRepository } from './spi/ayrshare.repository';
import { TrendsRepository } from './spi/trends.repository';
import { PublicationService } from './domain/publication.service';
import { DistributionService, AyrshareMetricsRefreshJob } from './domain/distribution.service';
import { AyrshareProfileService } from './domain/ayrshare-profile.service';
import { AyrshareWebhookEventService } from './domain/ayrshare-webhook-event.service';
import { PublicationsController } from './api/publications.controller';
import { DistributionsController } from './api/distributions.controller';
import { AyrshareController } from './api/ayrshare.controller';
import { TrendsController } from './api/trends.controller';
import { WebhooksController } from './api/webhooks.controller';
import { AdminController } from './api/admin.controller';

@Module({
  imports: [UrlPresignerModule, HttpClientModule],
  controllers: [
    PublicationsController,
    DistributionsController,
    AyrshareController,
    TrendsController,
    WebhooksController,
    AdminController,
  ],
  providers: [
    AyrshareRepository,
    TrendsRepository,
    PublicationService,
    DistributionService,
    AyrshareProfileService,
    AyrshareWebhookEventService,
    AyrshareMetricsRefreshJob,
  ],
})
export class RepurposingModule {}
