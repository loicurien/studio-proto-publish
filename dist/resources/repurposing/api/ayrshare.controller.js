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
exports.AyrshareController = void 0;
const common_1 = require("@nestjs/common");
const user_request_credentials_service_1 = require("../../../common/http-client/user-request-credentials.service");
const ayrshare_profile_service_1 = require("../domain/ayrshare-profile.service");
let AyrshareController = class AyrshareController {
    constructor(ayrshareProfiles, userRequest) {
        this.ayrshareProfiles = ayrshareProfiles;
        this.userRequest = userRequest;
    }
    async listProfiles() {
        const workspaceId = this.userRequest.workspaceId;
        if (!workspaceId) {
            throw new Error(`${user_request_credentials_service_1.WORKSPACE_ID_HEADER} header is required`);
        }
        const profiles = await this.ayrshareProfiles.listProfilesForWorkspace(workspaceId);
        return { profiles };
    }
    async getActivePlatforms(profileId) {
        const workspaceId = this.userRequest.workspaceId;
        if (!workspaceId) {
            throw new Error(`${user_request_credentials_service_1.WORKSPACE_ID_HEADER} header is required`);
        }
        if (!(profileId === null || profileId === void 0 ? void 0 : profileId.trim())) {
            throw new Error('profileId query is required');
        }
        const platforms = await this.ayrshareProfiles.getActivePlatformsForProfile(profileId, workspaceId);
        return { platforms };
    }
    async createOrUpdateProfile(body) {
        const workspaceId = this.userRequest.workspaceId;
        if (!workspaceId) {
            throw new Error(`${user_request_credentials_service_1.WORKSPACE_ID_HEADER} header is required`);
        }
        return this.ayrshareProfiles.upsertProfileForWorkspace(workspaceId, body.name, body.profileKey, body.id);
    }
    async upsertProfileKey(body) {
        const workspaceId = this.userRequest.workspaceId;
        if (!workspaceId) {
            throw new Error(`${user_request_credentials_service_1.WORKSPACE_ID_HEADER} header is required`);
        }
        await this.ayrshareProfiles.upsertProfileForWorkspace(workspaceId, 'Default', body.profileKey);
    }
};
exports.AyrshareController = AyrshareController;
__decorate([
    (0, common_1.Get)('profiles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AyrshareController.prototype, "listProfiles", null);
__decorate([
    (0, common_1.Get)('platforms'),
    __param(0, (0, common_1.Query)('profileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AyrshareController.prototype, "getActivePlatforms", null);
__decorate([
    (0, common_1.Post)('profiles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AyrshareController.prototype, "createOrUpdateProfile", null);
__decorate([
    (0, common_1.Post)('profile-key'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AyrshareController.prototype, "upsertProfileKey", null);
exports.AyrshareController = AyrshareController = __decorate([
    (0, common_1.Controller)('repurposing/ayrshare'),
    __metadata("design:paramtypes", [ayrshare_profile_service_1.AyrshareProfileService,
        user_request_credentials_service_1.UserRequestCredentialsService])
], AyrshareController);
//# sourceMappingURL=ayrshare.controller.js.map