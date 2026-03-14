import { DistributionService } from '../domain/distribution.service';
import { AyrshareWebhookEventService } from '../domain/ayrshare-webhook-event.service';
import { AyrshareWebhookPayload } from './ayrshare-webhook.dto';
export declare class WebhooksController {
    private readonly distributionService;
    private readonly webhookEventService;
    constructor(distributionService: DistributionService, webhookEventService: AyrshareWebhookEventService);
    ayrshare(payload: AyrshareWebhookPayload, _signature?: string): Promise<{
        received: true;
    }>;
    listEvents(action?: string, refId?: string, ayrshareProfileId?: string, from?: string, to?: string, limitStr?: string, offsetStr?: string): Promise<{
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
    }>;
    getEvent(id: string): Promise<{
        id: string;
        action: string;
        hookId: string | null;
        refId: string | null;
        ayrshareProfileId: string | null;
        payload: unknown;
        createdAt: string;
    } | null>;
}
