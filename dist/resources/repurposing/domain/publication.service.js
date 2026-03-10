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
exports.PublicationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma.service");
let PublicationService = class PublicationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(limit = 25, offset = 0) {
        return this.prisma.publication.findMany({
            take: limit,
            skip: offset,
            orderBy: { updatedAt: 'desc' },
            include: { distributions: true },
        });
    }
    async findOne(id) {
        const publication = await this.prisma.publication.findUnique({
            where: { id },
            include: { distributions: true },
        });
        if (!publication) {
            throw new common_1.NotFoundException(`Publication ${id} not found`);
        }
        return publication;
    }
    async create(input) {
        var _a, _b, _c, _d;
        return this.prisma.publication.create({
            data: {
                title: input.title,
                description: (_a = input.description) !== null && _a !== void 0 ? _a : null,
                postText: (_b = input.postText) !== null && _b !== void 0 ? _b : null,
                mediaUrls: input.mediaUrls ? JSON.stringify(input.mediaUrls) : null,
                mediaUrlsByFormat: input.mediaUrlsByFormat
                    ? JSON.stringify(input.mediaUrlsByFormat)
                    : null,
                scheduledAt: (_c = input.scheduledAt) !== null && _c !== void 0 ? _c : null,
                ayrshareProfileId: (_d = input.ayrshareProfileId) !== null && _d !== void 0 ? _d : null,
            },
        });
    }
    async update(id, input) {
        var _a;
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
                    ayrshareProfileId: (_a = input.ayrshareProfileId) !== null && _a !== void 0 ? _a : null,
                }),
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.publication.delete({ where: { id } });
    }
    async suggestContent(prompt) {
        const defaultHashtags = ['#social', '#content', '#engagement'];
        if (prompt === null || prompt === void 0 ? void 0 : prompt.trim()) {
            const slug = prompt
                .slice(0, 50)
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/[^a-z0-9]/g, '');
            return {
                title: prompt.slice(0, 100),
                description: `Description for: ${prompt.slice(0, 200)}`,
                postText: `Post content: ${prompt.slice(0, 500)}`,
                hashtags: [`#${slug || 'topic'}`, ...defaultHashtags].slice(0, 5),
            };
        }
        return {
            title: 'New publication',
            description: 'Brief description of your publication.',
            postText: 'Share your message here. Add hashtags and a call to action for better engagement.',
            hashtags: defaultHashtags,
        };
    }
};
exports.PublicationService = PublicationService;
exports.PublicationService = PublicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicationService);
//# sourceMappingURL=publication.service.js.map