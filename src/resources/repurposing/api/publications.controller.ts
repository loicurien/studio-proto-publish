import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PublicationService } from '../domain/publication.service';
import { DistributionService } from '../domain/distribution.service';
import { UrlPresignerService } from '../../../common/url-presigner/url-presigner.service';
import {
  CreatePublicationDto,
  PublicationResponseDto,
  UpdatePublicationDto,
} from './entities/publication.entity';
import {
  SuggestContentRequestDto,
  SuggestContentResponseDto,
} from './entities/suggest-content.entity';

@Controller('repurposing/publications')
export class PublicationsController {
  constructor(
    private readonly publicationService: PublicationService,
    private readonly distributionService: DistributionService,
    private readonly urlPresigner: UrlPresignerService,
  ) {}

  @Post('suggest-content')
  async suggestContent(
    @Body() dto: SuggestContentRequestDto,
  ): Promise<SuggestContentResponseDto> {
    return this.publicationService.suggestContent(dto.prompt);
  }

  @Get()
  async list(
    @Query('limit') limitStr?: string,
    @Query('offset') offsetStr?: string,
  ): Promise<PublicationResponseDto[]> {
    const limit = limitStr ? parseInt(limitStr, 10) : 25;
    const offset = offsetStr ? parseInt(offsetStr, 10) : 0;
    const list = await this.publicationService.findAll(limit, offset);
    return Promise.all(list.map((p) => this.withPresignedMediaUrls(p)));
  }

  /**
   * Lifetime totals (views / likes / shares) across all published
   * distributions, aggregated per platform. Uses persisted Ayrshare counters
   * so the response is fast and decoupled from the daily time-series used
   * by charts (no date window). Triggers a background refresh from Ayrshare
   * so subsequent calls see fresher numbers.
   */
  @Get('stats/totals')
  async getLifetimeTotals(): Promise<{
    totalViews: number;
    totalLikes: number;
    totalShares: number;
    byPlatform: Record<
      string,
      {
        views: number;
        likes: number;
        shares: number;
        distributionCount: number;
      }
    >;
  }> {
    return this.distributionService.getLifetimeTotals({ refresh: true });
  }

  /**
   * Most viewed posts by live Ayrshare view count (one card per distribution).
   */
  @Get('most-viewed/ayrshare')
  async getMostViewedFromAyrshare(
    @Query('limit') limitStr?: string,
  ): Promise<{ items: PublicationResponseDto[] }> {
    const limit = limitStr
      ? Math.min(20, parseInt(limitStr, 10) || 12)
      : 12;
    const rows =
      await this.distributionService.getMostViewedFromAyrshare(limit);
    const items = await Promise.all(
      rows.map(({ publication, distribution, viewCount }) =>
        this.withPresignedMediaUrls({
          ...publication,
          distributions: [{ ...distribution, viewCount }],
        }),
      ),
    );
    return { items };
  }

  @Get(':id/refresh-ayrshare-status')
  async refreshAyrshareStatus(
    @Param('id') id: string,
  ): Promise<PublicationResponseDto> {
    await this.distributionService.refreshAyrshareStatusForPublication(id);
    const p = await this.publicationService.findOne(id);
    return this.withPresignedMediaUrls(p);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<PublicationResponseDto> {
    const p = await this.publicationService.findOne(id);
    return this.withPresignedMediaUrls(p);
  }

  @Post(':id/send-to-review')
  async sendToReview(@Param('id') id: string): Promise<PublicationResponseDto> {
    await this.distributionService.markPublicationForReview(id);
    const p = await this.publicationService.findOne(id);
    return this.withPresignedMediaUrls(p);
  }

  @Post(':id/approve-review')
  async approveReview(@Param('id') id: string): Promise<PublicationResponseDto> {
    await this.distributionService.approvePublicationReview(id);
    const p = await this.publicationService.findOne(id);
    return this.withPresignedMediaUrls(p);
  }

  private async withPresignedMediaUrls(
    p: Awaited<ReturnType<PublicationService['findOne']>>,
  ): Promise<PublicationResponseDto> {
    const pubMediaByFormat = p.mediaUrlsByFormat
      ? (JSON.parse(p.mediaUrlsByFormat) as Record<string, string[]>)
      : undefined;
    const pubMediaUrls = p.mediaUrls
      ? (JSON.parse(p.mediaUrls) as string[])
      : [];

    const presign = async (url: string): Promise<string> => {
      const signed = await this.urlPresigner.presignUrl(url);
      return signed ?? url;
    };

    try {
      const presignedPubUrls =
        pubMediaUrls.length > 0
          ? await Promise.all(pubMediaUrls.map(presign))
          : [];
      const pWithPresignedPub = {
        ...p,
        mediaUrls:
          presignedPubUrls.length > 0
            ? JSON.stringify(presignedPubUrls)
            : p.mediaUrls,
      };

      const distributions = await Promise.all(
        p.distributions.map(async (d) => {
          let raw: string[] = d.mediaUrls
            ? (JSON.parse(d.mediaUrls) as string[])
            : [];
          if (
            raw.length === 0 &&
            d.preferredFormat &&
            pubMediaByFormat?.[d.preferredFormat]?.length
          ) {
            raw = pubMediaByFormat[d.preferredFormat];
          }
          if (raw.length === 0 && pubMediaUrls.length > 0) {
            raw = pubMediaUrls;
          }
          const presigned =
            raw.length > 0 ? await Promise.all(raw.map(presign)) : [];
          return {
            ...d,
            mediaUrls:
              presigned.length > 0 ? JSON.stringify(presigned) : d.mediaUrls,
          };
        }),
      );

      return PublicationResponseDto.from(
        { ...pWithPresignedPub, distributions },
        true,
      );
    } catch {
      return PublicationResponseDto.from(p, true);
    }
  }

  @Post()
  async create(
    @Body() dto: CreatePublicationDto,
  ): Promise<PublicationResponseDto> {
    const p = await this.publicationService.create({
      title: dto.title,
      description: dto.description,
      postText: dto.postText,
      mediaUrls: dto.mediaUrls,
      mediaUrlsByFormat: dto.mediaUrlsByFormat,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      ayrshareProfileId: dto.ayrshareProfileId,
    });
    return PublicationResponseDto.from(p, false);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePublicationDto,
  ): Promise<PublicationResponseDto> {
    const p = await this.publicationService.update(id, {
      title: dto.title,
      description: dto.description,
      postText: dto.postText,
      mediaUrls: dto.mediaUrls,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      ayrshareProfileId: dto.ayrshareProfileId,
    });
    return PublicationResponseDto.from(p, false);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.publicationService.remove(id);
  }
}
