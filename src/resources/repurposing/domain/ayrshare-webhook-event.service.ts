import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { AyrshareWebhookEvent as PrismaWebhookEvent } from '@prisma/client';

export interface CreateWebhookEventInput {
  action: string;
  hookId?: string | null;
  refId?: string | null;
  ayrshareProfileId?: string | null;
  payload: Record<string, unknown>;
}

export interface ListWebhookEventsFilters {
  action?: string;
  refId?: string;
  ayrshareProfileId?: string;
  from?: Date;
  to?: Date;
  limit?: number;
  offset?: number;
}

@Injectable()
export class AyrshareWebhookEventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateWebhookEventInput): Promise<PrismaWebhookEvent> {
    return this.prisma.ayrshareWebhookEvent.create({
      data: {
        action: input.action,
        hookId: input.hookId ?? undefined,
        refId: input.refId ?? undefined,
        ayrshareProfileId: input.ayrshareProfileId ?? undefined,
        payload: input.payload as object,
      },
    });
  }

  async updateProfileId(
    id: string,
    ayrshareProfileId: string,
  ): Promise<PrismaWebhookEvent> {
    return this.prisma.ayrshareWebhookEvent.update({
      where: { id },
      data: { ayrshareProfileId },
    });
  }

  async findAll(
    filters: ListWebhookEventsFilters = {},
  ): Promise<{ events: PrismaWebhookEvent[]; total: number }> {
    const {
      action,
      refId,
      ayrshareProfileId,
      from,
      to,
      limit = 50,
      offset = 0,
    } = filters;

    const where: Record<string, unknown> = {};
    if (action) where.action = action;
    if (refId) where.refId = refId;
    if (ayrshareProfileId) where.ayrshareProfileId = ayrshareProfileId;
    if (from || to) {
      where.createdAt = {};
      if (from) (where.createdAt as Record<string, Date>).gte = from;
      if (to) (where.createdAt as Record<string, Date>).lte = to;
    }

    const [events, total] = await Promise.all([
      this.prisma.ayrshareWebhookEvent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: Math.min(limit, 100),
        skip: offset,
      }),
      this.prisma.ayrshareWebhookEvent.count({ where }),
    ]);

    return { events, total };
  }

  async findOne(id: string): Promise<PrismaWebhookEvent | null> {
    return this.prisma.ayrshareWebhookEvent.findUnique({
      where: { id },
    });
  }
}
