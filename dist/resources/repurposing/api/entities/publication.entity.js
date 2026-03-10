"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationResponseDto = exports.UpdatePublicationDto = exports.CreatePublicationDto = void 0;
const distribution_entity_1 = require("./distribution.entity");
class CreatePublicationDto {
}
exports.CreatePublicationDto = CreatePublicationDto;
class UpdatePublicationDto {
}
exports.UpdatePublicationDto = UpdatePublicationDto;
class PublicationResponseDto {
    static from(p, includeDistributions = true) {
        var _a, _b, _c, _d;
        const dto = new PublicationResponseDto();
        dto.id = p.id;
        dto.title = p.title;
        dto.description = (_a = p.description) !== null && _a !== void 0 ? _a : undefined;
        dto.postText = (_b = p.postText) !== null && _b !== void 0 ? _b : undefined;
        dto.mediaUrls = p.mediaUrls ? JSON.parse(p.mediaUrls) : undefined;
        dto.scheduledAt = (_c = p.scheduledAt) === null || _c === void 0 ? void 0 : _c.toISOString();
        dto.ayrshareProfileId = (_d = p.ayrshareProfileId) !== null && _d !== void 0 ? _d : undefined;
        dto.createdAt = p.createdAt.toISOString();
        dto.updatedAt = p.updatedAt.toISOString();
        if (includeDistributions && p.distributions) {
            dto.distributions = p.distributions.map((d) => distribution_entity_1.DistributionResponseDto.from(d));
        }
        return dto;
    }
}
exports.PublicationResponseDto = PublicationResponseDto;
//# sourceMappingURL=publication.entity.js.map