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
exports.DistributionsController = void 0;
const common_1 = require("@nestjs/common");
const distribution_service_1 = require("../domain/distribution.service");
const distribution_entity_1 = require("./entities/distribution.entity");
let DistributionsController = class DistributionsController {
    constructor(distributionService) {
        this.distributionService = distributionService;
    }
    async listByPublication(publicationId) {
        const list = await this.distributionService.findByPublicationId(publicationId);
        return list.map((d) => distribution_entity_1.DistributionResponseDto.from(d));
    }
    async getOne(id) {
        const d = await this.distributionService.findOne(id);
        return distribution_entity_1.DistributionResponseDto.from(d);
    }
    async create(publicationId, dto) {
        const d = await this.distributionService.create(publicationId, {
            platform: dto.platform,
            postText: dto.postText,
            mediaUrls: dto.mediaUrls,
            scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
            platformOptions: dto.platformOptions,
            preferredFormat: dto.preferredFormat,
            hashtags: dto.hashtags,
        });
        return distribution_entity_1.DistributionResponseDto.from(d);
    }
    async publish(id) {
        const d = await this.distributionService.publish(id);
        return distribution_entity_1.DistributionResponseDto.from(d);
    }
    async update(id, dto) {
        const d = await this.distributionService.update(id, {
            postText: dto.postText,
            mediaUrls: dto.mediaUrls,
            scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
            platformOptions: dto.platformOptions,
            hashtags: dto.hashtags,
        });
        return distribution_entity_1.DistributionResponseDto.from(d);
    }
    async remove(id) {
        await this.distributionService.remove(id);
    }
};
exports.DistributionsController = DistributionsController;
__decorate([
    (0, common_1.Get)('publications/:publicationId/distributions'),
    __param(0, (0, common_1.Param)('publicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DistributionsController.prototype, "listByPublication", null);
__decorate([
    (0, common_1.Get)('distributions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DistributionsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('publications/:publicationId/distributions'),
    __param(0, (0, common_1.Param)('publicationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, distribution_entity_1.CreateDistributionDto]),
    __metadata("design:returntype", Promise)
], DistributionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('distributions/:id/publish'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DistributionsController.prototype, "publish", null);
__decorate([
    (0, common_1.Patch)('distributions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, distribution_entity_1.UpdateDistributionDto]),
    __metadata("design:returntype", Promise)
], DistributionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('distributions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DistributionsController.prototype, "remove", null);
exports.DistributionsController = DistributionsController = __decorate([
    (0, common_1.Controller)('repurposing'),
    __metadata("design:paramtypes", [distribution_service_1.DistributionService])
], DistributionsController);
//# sourceMappingURL=distributions.controller.js.map