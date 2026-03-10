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
exports.TrendsController = void 0;
const common_1 = require("@nestjs/common");
const trends_repository_1 = require("../spi/trends.repository");
const distribution_service_1 = require("../domain/distribution.service");
let TrendsController = class TrendsController {
    constructor(trends, distributionService) {
        this.trends = trends;
        this.distributionService = distributionService;
    }
    async getTrendingHashtags(limitStr) {
        const limit = limitStr
            ? Math.min(50, Math.max(1, parseInt(limitStr, 10) || 10))
            : 10;
        const result = await this.trends.getTrendingHashtags(limit);
        return {
            hashtags: result.hashtags,
            ...(result.error && { error: result.error }),
        };
    }
    async getTopViewedHashtags(limitStr) {
        const limit = limitStr
            ? Math.min(50, Math.max(1, parseInt(limitStr, 10) || 10))
            : 10;
        const result = await this.distributionService.getTopViewedHashtags(limit);
        return {
            items: result.items,
            ...(result.error && { error: result.error }),
        };
    }
};
exports.TrendsController = TrendsController;
__decorate([
    (0, common_1.Get)('hashtags'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrendsController.prototype, "getTrendingHashtags", null);
__decorate([
    (0, common_1.Get)('hashtags-used'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrendsController.prototype, "getTopViewedHashtags", null);
exports.TrendsController = TrendsController = __decorate([
    (0, common_1.Controller)('repurposing/trends'),
    __metadata("design:paramtypes", [trends_repository_1.TrendsRepository,
        distribution_service_1.DistributionService])
], TrendsController);
//# sourceMappingURL=trends.controller.js.map