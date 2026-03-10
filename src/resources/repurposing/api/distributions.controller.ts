import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DistributionService } from '../domain/distribution.service';
import {
  CreateDistributionDto,
  DistributionResponseDto,
  UpdateDistributionDto,
} from './entities/distribution.entity';

@Controller('repurposing')
export class DistributionsController {
  constructor(private readonly distributionService: DistributionService) {}

  @Get('publications/:publicationId/distributions')
  async listByPublication(
    @Param('publicationId') publicationId: string,
  ): Promise<DistributionResponseDto[]> {
    const list = await this.distributionService.findByPublicationId(
      publicationId,
    );
    return list.map((d) => DistributionResponseDto.from(d));
  }

  @Get('distributions/:id')
  async getOne(@Param('id') id: string): Promise<DistributionResponseDto> {
    const d = await this.distributionService.findOne(id);
    return DistributionResponseDto.from(d);
  }

  @Post('publications/:publicationId/distributions')
  async create(
    @Param('publicationId') publicationId: string,
    @Body() dto: CreateDistributionDto,
  ): Promise<DistributionResponseDto> {
    const d = await this.distributionService.create(publicationId, {
      platform: dto.platform,
      postText: dto.postText,
      mediaUrls: dto.mediaUrls,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      platformOptions: dto.platformOptions,
      preferredFormat: dto.preferredFormat,
      hashtags: dto.hashtags,
    });
    return DistributionResponseDto.from(d);
  }

  @Post('distributions/:id/publish')
  async publish(@Param('id') id: string): Promise<DistributionResponseDto> {
    const d = await this.distributionService.publish(id);
    return DistributionResponseDto.from(d);
  }

  @Patch('distributions/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDistributionDto,
  ): Promise<DistributionResponseDto> {
    const d = await this.distributionService.update(id, {
      postText: dto.postText,
      mediaUrls: dto.mediaUrls,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      platformOptions: dto.platformOptions,
      hashtags: dto.hashtags,
    });
    return DistributionResponseDto.from(d);
  }

  @Delete('distributions/:id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.distributionService.remove(id);
  }
}
