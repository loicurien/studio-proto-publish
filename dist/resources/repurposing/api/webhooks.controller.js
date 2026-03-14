"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const distribution_service_1 = require("../domain/distribution.service");
const ayrshare_webhook_event_service_1 = require("../domain/ayrshare-webhook-event.service");
let WebhooksController = class WebhooksController {
    constructor(distributionService, webhookEventService) {
        this.distributionService = distributionService;
        this.webhookEventService = webhookEventService;
    }
    async ayrshare(payload, _signature) {
        const action = typeof payload.action === 'string' ? payload.action : 'unknown';
        const hookId = typeof payload.hookId === 'string' ? payload.hookId : undefined;
        const refId = typeof payload.refId === 'string' ? payload.refId : undefined;
        const event = await this.webhookEventService.create({
            action,
            hookId,
            refId,
            ayrshareProfileId: null,
            payload: payload,
        });
        const result = await this.distributionService.handleAyrshareWebhook(payload);
        if (result.ayrshareProfileId) {
            await this.webhookEventService.updateProfileId(event.id, result.ayrshareProfileId);
        }
        return { received: true };
    }
    async listEvents(action, refId, ayrshareProfileId, from, to, limitStr, offsetStr) {
        const fromDate = from ? new Date(from) : undefined;
        const toDate = to ? new Date(to) : undefined;
        const limit = limitStr !== undefined && limitStr !== ''
            ? Math.min(Math.max(0, Number(limitStr) || 0), 100)
            : undefined;
        const offset = offsetStr !== undefined && offsetStr !== ''
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
    async getEvent(id) {
        const event = await this.webhookEventService.findOne(id);
        if (!event)
            return null;
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
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)('ayrshare'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-ayrshare-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "ayrshare", null);
__decorate([
    (0, common_1.Get)('events'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Query)('refId')),
    __param(2, (0, common_1.Query)('ayrshareProfileId')),
    __param(3, (0, common_1.Query)('from')),
    __param(4, (0, common_1.Query)('to')),
    __param(5, (0, common_1.Query)('limit')),
    __param(6, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "listEvents", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "getEvent", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, common_1.Controller)('repurposing/webhooks'),
    __metadata("design:paramtypes", [distribution_service_1.DistributionService,
        ayrshare_webhook_event_service_1.AyrshareWebhookEventService])
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map