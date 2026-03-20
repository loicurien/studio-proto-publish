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
exports.PublicationsController = void 0;
const common_1 = require("@nestjs/common");
const publication_service_1 = require("../domain/publication.service");
const distribution_service_1 = require("../domain/distribution.service");
const url_presigner_service_1 = require("../../../common/url-presigner/url-presigner.service");
const publication_entity_1 = require("./entities/publication.entity");
const suggest_content_entity_1 = require("./entities/suggest-content.entity");
let PublicationsController = class PublicationsController {
    constructor(publicationService, distributionService, urlPresigner) {
        this.publicationService = publicationService;
        this.distributionService = distributionService;
        this.urlPresigner = urlPresigner;
    }
    async suggestContent(dto) {
        return this.publicationService.suggestContent(dto.prompt);
    }
    async list(limitStr, offsetStr) {
        const limit = limitStr ? parseInt(limitStr, 10) : 25;
        const offset = offsetStr ? parseInt(offsetStr, 10) : 0;
        const list = await this.publicationService.findAll(limit, offset);
        return Promise.all(list.map((p) => this.withPresignedMediaUrls(p)));
    }
    async getMostViewedFromAyrshare(limitStr) {
        const limit = limitStr
            ? Math.min(20, parseInt(limitStr, 10) || 12)
            : 12;
        const rows = await this.distributionService.getMostViewedFromAyrshare(limit);
        const items = await Promise.all(rows.map(({ publication, distribution, viewCount }) => this.withPresignedMediaUrls({
            ...publication,
            distributions: [{ ...distribution, viewCount }],
        })));
        return { items };
    }
    async refreshAyrshareStatus(id) {
        await this.distributionService.refreshAyrshareStatusForPublication(id);
        const p = await this.publicationService.findOne(id);
        return this.withPresignedMediaUrls(p);
    }
    async getOne(id) {
        const p = await this.publicationService.findOne(id);
        return this.withPresignedMediaUrls(p);
    }
    async sendToReview(id) {
        await this.distributionService.markPublicationForReview(id);
        const p = await this.publicationService.findOne(id);
        return this.withPresignedMediaUrls(p);
    }
    async approveReview(id) {
        await this.distributionService.approvePublicationReview(id);
        const p = await this.publicationService.findOne(id);
        return this.withPresignedMediaUrls(p);
    }
    async withPresignedMediaUrls(p) {
        const pubMediaByFormat = p.mediaUrlsByFormat
            ? JSON.parse(p.mediaUrlsByFormat)
            : undefined;
        const pubMediaUrls = p.mediaUrls
            ? JSON.parse(p.mediaUrls)
            : [];
        const presign = async (url) => {
            const signed = await this.urlPresigner.presignUrl(url);
            return signed !== null && signed !== void 0 ? signed : url;
        };
        try {
            const presignedPubUrls = pubMediaUrls.length > 0
                ? await Promise.all(pubMediaUrls.map(presign))
                : [];
            const pWithPresignedPub = {
                ...p,
                mediaUrls: presignedPubUrls.length > 0
                    ? JSON.stringify(presignedPubUrls)
                    : p.mediaUrls,
            };
            const distributions = await Promise.all(p.distributions.map(async (d) => {
                var _a;
                let raw = d.mediaUrls
                    ? JSON.parse(d.mediaUrls)
                    : [];
                if (raw.length === 0 &&
                    d.preferredFormat &&
                    ((_a = pubMediaByFormat === null || pubMediaByFormat === void 0 ? void 0 : pubMediaByFormat[d.preferredFormat]) === null || _a === void 0 ? void 0 : _a.length)) {
                    raw = pubMediaByFormat[d.preferredFormat];
                }
                if (raw.length === 0 && pubMediaUrls.length > 0) {
                    raw = pubMediaUrls;
                }
                const presigned = raw.length > 0 ? await Promise.all(raw.map(presign)) : [];
                return {
                    ...d,
                    mediaUrls: presigned.length > 0 ? JSON.stringify(presigned) : d.mediaUrls,
                };
            }));
            return publication_entity_1.PublicationResponseDto.from({ ...pWithPresignedPub, distributions }, true);
        }
        catch {
            return publication_entity_1.PublicationResponseDto.from(p, true);
        }
    }
    async create(dto) {
        const p = await this.publicationService.create({
            title: dto.title,
            description: dto.description,
            postText: dto.postText,
            mediaUrls: dto.mediaUrls,
            mediaUrlsByFormat: dto.mediaUrlsByFormat,
            scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
            ayrshareProfileId: dto.ayrshareProfileId,
        });
        return publication_entity_1.PublicationResponseDto.from(p, false);
    }
    async update(id, dto) {
        const p = await this.publicationService.update(id, {
            title: dto.title,
            description: dto.description,
            postText: dto.postText,
            mediaUrls: dto.mediaUrls,
            scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
            ayrshareProfileId: dto.ayrshareProfileId,
        });
        return publication_entity_1.PublicationResponseDto.from(p, false);
    }
    async remove(id) {
        await this.publicationService.remove(id);
    }
};
exports.PublicationsController = PublicationsController;
__decorate([
    (0, common_1.Post)('suggest-content'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [suggest_content_entity_1.SuggestContentRequestDto]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "suggestContent", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('most-viewed/ayrshare'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "getMostViewedFromAyrshare", null);
__decorate([
    (0, common_1.Get)(':id/refresh-ayrshare-status'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "refreshAyrshareStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(':id/send-to-review'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "sendToReview", null);
__decorate([
    (0, common_1.Post)(':id/approve-review'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "approveReview", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publication_entity_1.CreatePublicationDto]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, publication_entity_1.UpdatePublicationDto]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "remove", null);
exports.PublicationsController = PublicationsController = __decorate([
    (0, common_1.Controller)('repurposing/publications'),
    __metadata("design:paramtypes", [publication_service_1.PublicationService,
        distribution_service_1.DistributionService,
        url_presigner_service_1.UrlPresignerService])
], PublicationsController);
//# sourceMappingURL=publications.controller.js.map