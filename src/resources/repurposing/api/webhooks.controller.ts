import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DistributionService } from '../domain/distribution.service';
import { AyrshareWebhookEventService } from '../domain/ayrshare-webhook-event.service';
import { AyrshareWebhookPayload } from './ayrshare-webhook.dto';

/**
 * Receives webhooks from Ayrshare (scheduled, social, messages, feed, batch, accountActivity).
 * All payloads are stored in the database; scheduled events also update distribution status.
 * Register your URL in Ayrshare dashboard or via POST https://api.ayrshare.com/api/hook/webhook.
 * The POST endpoint must be publicly reachable over HTTPS and respond with 200 within 10 seconds.
 */
@Controller('repurposing/webhooks')
export class WebhooksController {
  constructor(
    private readonly distributionService: DistributionService,
    private readonly webhookEventService: AyrshareWebhookEventService,
  ) {}

  @Post('ayrshare')
  @HttpCode(HttpStatus.OK)
  async ayrshare(
    @Body() payload: AyrshareWebhookPayload,
    @Headers('x-ayrshare-signature') _signature?: string,
  ): Promise<{ received: true }> {
    const action =
      typeof payload.action === 'string' ? payload.action : 'unknown';
    const hookId =
      typeof payload.hookId === 'string' ? payload.hookId : undefined;
    const refId = typeof payload.refId === 'string' ? payload.refId : undefined;

    const event = await this.webhookEventService.create({
      action,
      hookId,
      refId,
      ayrshareProfileId: null,
      payload: payload as Record<string, unknown>,
    });

    const result =
      await this.distributionService.handleAyrshareWebhook(payload);
    if (result.ayrshareProfileId) {
      await this.webhookEventService.updateProfileId(
        event.id,
        result.ayrshareProfileId,
      );
    }

    return { received: true };
  }

  @Get('events')
  async listEvents(
    @Query('action') action?: string,
    @Query('refId') refId?: string,
    @Query('ayrshareProfileId') ayrshareProfileId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limitStr?: string,
    @Query('offset') offsetStr?: string,
  ): Promise<{
    events: Array<{
      id: string;
      action: string;
      hookId: string | null;
      refId: string | null;
      ayrshareProfileId: string | null;
      payload: unknown;
      createdAt: string;
    }>;
    total: number;
  }> {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;
    const limit =
      limitStr !== undefined && limitStr !== ''
        ? Math.min(Math.max(0, Number(limitStr) || 0), 100)
        : undefined;
    const offset =
      offsetStr !== undefined && offsetStr !== ''
        ? Math.max(0, Number(offsetStr) || 0)
        : undefined;
    const { events, total } = await this.webhookEventService.findAll({
      action,
      refId,
      ayrshareProfileId,
      from: fromDate,
      to: toDate,
      limit,
      offset,
    });
    return {
      events: events.map((e) => ({
        id: e.id,
        action: e.action,
        hookId: e.hookId,
        refId: e.refId,
        ayrshareProfileId: e.ayrshareProfileId,
        payload: e.payload,
        createdAt: e.createdAt.toISOString(),
      })),
      total,
    };
  }

  @Get('events/:id')
  async getEvent(
    @Param('id') id: string,
  ): Promise<{
    id: string;
    action: string;
    hookId: string | null;
    refId: string | null;
    ayrshareProfileId: string | null;
    payload: unknown;
    createdAt: string;
  } | null> {
    const event = await this.webhookEventService.findOne(id);
    if (!event) return null;
    return {
      id: event.id,
      action: event.action,
      hookId: event.hookId,
      refId: event.refId,
      ayrshareProfileId: event.ayrshareProfileId,
      payload: event.payload,
      createdAt: event.createdAt.toISOString(),
    };
  }
}
