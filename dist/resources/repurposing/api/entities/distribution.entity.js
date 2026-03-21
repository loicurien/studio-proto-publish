"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributionResponseDto = exports.UpdateDistributionDto = exports.CreateDistributionDto = void 0;
class CreateDistributionDto {
}
exports.CreateDistributionDto = CreateDistributionDto;
class UpdateDistributionDto {
}
exports.UpdateDistributionDto = UpdateDistributionDto;
class DistributionResponseDto {
    static from(d) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const dto = new DistributionResponseDto();
        dto.id = d.id;
        dto.publicationId = d.publicationId;
        dto.platform = d.platform;
        dto.status = d.status;
        dto.ayrsharePostId = (_a = d.ayrsharePostId) !== null && _a !== void 0 ? _a : undefined;
        dto.platformPostId = (_b = d.platformPostId) !== null && _b !== void 0 ? _b : undefined;
        dto.postUrl = (_c = d.postUrl) !== null && _c !== void 0 ? _c : undefined;
        dto.errorMessage = (_d = d.errorMessage) !== null && _d !== void 0 ? _d : undefined;
        dto.scheduledAt = (_e = d.scheduledAt) === null || _e === void 0 ? void 0 : _e.toISOString();
        dto.publishedAt = (_f = d.publishedAt) === null || _f === void 0 ? void 0 : _f.toISOString();
        dto.postText = (_g = d.postText) !== null && _g !== void 0 ? _g : undefined;
        dto.mediaUrls = d.mediaUrls ? JSON.parse(d.mediaUrls) : undefined;
        dto.platformOptions = d.platformOptions
            ? JSON.parse(d.platformOptions)
            : undefined;
        dto.hashtags = d.hashtags ? JSON.parse(d.hashtags) : undefined;
        dto.preferredFormat = (_h = d.preferredFormat) !== null && _h !== void 0 ? _h : undefined;
        dto.viewCount = (_j = d.viewCount) !== null && _j !== void 0 ? _j : undefined;
        dto.likeCount = (_k = d.likeCount) !== null && _k !== void 0 ? _k : undefined;
        dto.shareCount = (_l = d.shareCount) !== null && _l !== void 0 ? _l : undefined;
        dto.commentCount = (_m = d.commentCount) !== null && _m !== void 0 ? _m : undefined;
        dto.createdAt = d.createdAt.toISOString();
        dto.updatedAt = d.updatedAt.toISOString();
        return dto;
    }
}
exports.DistributionResponseDto = DistributionResponseDto;
//# sourceMappingURL=distribution.entity.js.map