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
export declare class AyrshareWebhookEventService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(input: CreateWebhookEventInput): Promise<PrismaWebhookEvent>;
    updateProfileId(id: string, ayrshareProfileId: string): Promise<PrismaWebhookEvent>;
    findAll(filters?: ListWebhookEventsFilters): Promise<{
        events: PrismaWebhookEvent[];
        total: number;
    }>;
    findOne(id: string): Promise<PrismaWebhookEvent | null>;
}
