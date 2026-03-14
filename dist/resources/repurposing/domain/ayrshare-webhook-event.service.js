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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyrshareWebhookEventService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma.service");
let AyrshareWebhookEventService = class AyrshareWebhookEventService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(input) {
        var _a, _b, _c;
        return this.prisma.ayrshareWebhookEvent.create({
            data: {
                action: input.action,
                hookId: (_a = input.hookId) !== null && _a !== void 0 ? _a : undefined,
                refId: (_b = input.refId) !== null && _b !== void 0 ? _b : undefined,
                ayrshareProfileId: (_c = input.ayrshareProfileId) !== null && _c !== void 0 ? _c : undefined,
                payload: input.payload,
            },
        });
    }
    async updateProfileId(id, ayrshareProfileId) {
        return this.prisma.ayrshareWebhookEvent.update({
            where: { id },
            data: { ayrshareProfileId },
        });
    }
    async findAll(filters = {}) {
        const { action, refId, ayrshareProfileId, from, to, limit = 50, offset = 0, } = filters;
        const where = {};
        if (action)
            where.action = action;
        if (refId)
            where.refId = refId;
        if (ayrshareProfileId)
            where.ayrshareProfileId = ayrshareProfileId;
        if (from || to) {
            where.createdAt = {};
            if (from)
                where.createdAt.gte = from;
            if (to)
                where.createdAt.lte = to;
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
    async findOne(id) {
        return this.prisma.ayrshareWebhookEvent.findUnique({
            where: { id },
        });
    }
};
exports.AyrshareWebhookEventService = AyrshareWebhookEventService;
exports.AyrshareWebhookEventService = AyrshareWebhookEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AyrshareWebhookEventService);
//# sourceMappingURL=ayrshare-webhook-event.service.js.map