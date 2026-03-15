import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Publication, Distribution } from '@prisma/client';
import { getRandomOfficeSuggestion } from './the-office-suggestions';

export interface CreatePublicationInput {
  title: string;
  description?: string;
  postText?: string;
  mediaUrls?: string[];
  mediaUrlsByFormat?: Record<string, string[]>;
  scheduledAt?: Date;
  ayrshareProfileId?: string;
}

export interface UpdatePublicationInput {
  title?: string;
  description?: string;
  postText?: string;
  mediaUrls?: string[];
  scheduledAt?: Date;
  ayrshareProfileId?: string;
}

@Injectable()
export class PublicationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    limit = 25,
    offset = 0,
  ): Promise<(Publication & { distributions: Distribution[] })[]> {
    return this.prisma.publication.findMany({
      take: limit,
      skip: offset,
      orderBy: { updatedAt: 'desc' },
      include: { distributions: true },
    });
  }

  async findOne(id: string): Promise<Publication & { distributions: Distribution[] }> {
    const publication = await this.prisma.publication.findUnique({
      where: { id },
      include: { distributions: true },
    });
    if (!publication) {
      throw new NotFoundException(`Publication ${id} not found`);
    }
    return publication;
  }

  async create(input: CreatePublicationInput): Promise<Publication> {
    return this.prisma.publication.create({
      data: {
        title: input.title,
        description: input.description ?? null,
        postText: input.postText ?? null,
        mediaUrls: input.mediaUrls ? JSON.stringify(input.mediaUrls) : null,
        mediaUrlsByFormat: input.mediaUrlsByFormat
          ? JSON.stringify(input.mediaUrlsByFormat)
          : null,
        scheduledAt: input.scheduledAt ?? null,
        ayrshareProfileId: input.ayrshareProfileId ?? null,
      },
    });
  }

  async update(id: string, input: UpdatePublicationInput): Promise<Publication> {
    await this.findOne(id);
    return this.prisma.publication.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.postText !== undefined && { postText: input.postText }),
        ...(input.mediaUrls !== undefined && {
          mediaUrls: input.mediaUrls ? JSON.stringify(input.mediaUrls) : null,
        }),
        ...(input.scheduledAt !== undefined && { scheduledAt: input.scheduledAt }),
        ...(input.ayrshareProfileId !== undefined && {
          ayrshareProfileId: input.ayrshareProfileId ?? null,
        }),
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.publication.delete({ where: { id } });
  }

  /**
   * Suggests title, description, post text and hashtags for The Office–themed content.
   * Each call returns a random draw from curated titles and punchlines so results vary.
   */
  async suggestContent(_prompt?: string): Promise<{
    title: string;
    description?: string;
    postText?: string;
    hashtags?: string[];
  }> {
    return getRandomOfficeSuggestion();
  }
}
