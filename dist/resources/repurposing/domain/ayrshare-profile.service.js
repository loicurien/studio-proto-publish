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
exports.AyrshareProfileService = void 0;
const common_1 = require("@nestjs/common");
const user_request_credentials_service_1 = require("../../../common/http-client/user-request-credentials.service");
const prisma_service_1 = require("../../../prisma.service");
const ayrshare_repository_1 = require("../spi/ayrshare.repository");
let AyrshareProfileService = class AyrshareProfileService {
    constructor(prisma, ayrshare) {
        this.prisma = prisma;
        this.ayrshare = ayrshare;
    }
    async listProfilesForWorkspace(workspaceId) {
        let rows = await this.prisma.ayrshareProfile.findMany({
            where: { workspaceId },
            orderBy: { name: 'asc' },
        });
        if (rows.length === 0 &&
            workspaceId !== user_request_credentials_service_1.DEFAULT_STUDIO_WORKSPACE_ID) {
            rows = await this.prisma.ayrshareProfile.findMany({
                where: { workspaceId: user_request_credentials_service_1.DEFAULT_STUDIO_WORKSPACE_ID },
                orderBy: { name: 'asc' },
            });
        }
        return rows.map((r) => ({
            id: r.id,
            name: r.name,
            profileKey: r.profileKey,
        }));
    }
    async getProfileKeyById(profileId, workspaceId) {
        const record = await this.prisma.ayrshareProfile.findFirst({
            where: { id: profileId, workspaceId },
        });
        if (!record) {
            throw new common_1.NotFoundException(`Ayrshare profile ${profileId} not found`);
        }
        return record.profileKey;
    }
    async getProfileKeyByIdOnly(profileId) {
        const record = await this.prisma.ayrshareProfile.findUnique({
            where: { id: profileId },
        });
        if (!record) {
            throw new common_1.NotFoundException(`Ayrshare profile ${profileId} not found`);
        }
        return record.profileKey;
    }
    async getFirstProfileKeyForWorkspace(workspaceId) {
        var _a;
        const record = await this.prisma.ayrshareProfile.findFirst({
            where: { workspaceId },
            orderBy: { name: 'asc' },
        });
        return (_a = record === null || record === void 0 ? void 0 : record.profileKey) !== null && _a !== void 0 ? _a : null;
    }
    async getActivePlatformsForProfile(profileId, workspaceId) {
        var _a;
        const profileKey = await this.getProfileKeyById(profileId, workspaceId);
        const profile = await this.ayrshare.getUserProfile(profileKey);
        const raw = ((_a = profile.activeSocialAccounts) !== null && _a !== void 0 ? _a : []);
        return raw.map((p) => {
            if (p === 'gmb')
                return 'googlebusiness';
            return p;
        });
    }
    async upsertProfileForWorkspace(workspaceId, name, profileKey, profileId) {
        if (!(name === null || name === void 0 ? void 0 : name.trim())) {
            throw new common_1.BadRequestException('Profile name is required');
        }
        if (!(profileKey === null || profileKey === void 0 ? void 0 : profileKey.trim())) {
            throw new common_1.BadRequestException('Profile key is required');
        }
        if (profileId) {
            await this.prisma.ayrshareProfile.updateMany({
                where: { id: profileId, workspaceId },
                data: { name: name.trim(), profileKey: profileKey.trim() },
            });
            const row = await this.prisma.ayrshareProfile.findUniqueOrThrow({
                where: { id: profileId },
            });
            return { id: row.id, name: row.name, profileKey: row.profileKey };
        }
        const row = await this.prisma.ayrshareProfile.upsert({
            where: {
                workspaceId_profileKey: { workspaceId, profileKey: profileKey.trim() },
            },
            update: { name: name.trim() },
            create: {
                workspaceId,
                name: name.trim(),
                profileKey: profileKey.trim(),
            },
        });
        return { id: row.id, name: row.name, profileKey: row.profileKey };
    }
};
exports.AyrshareProfileService = AyrshareProfileService;
exports.AyrshareProfileService = AyrshareProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ayrshare_repository_1.AyrshareRepository])
], AyrshareProfileService);
//# sourceMappingURL=ayrshare-profile.service.js.map