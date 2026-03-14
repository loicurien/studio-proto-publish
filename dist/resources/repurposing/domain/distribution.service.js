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
exports.DistributionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma.service");
const url_presigner_service_1 = require("../../../common/url-presigner/url-presigner.service");
const user_request_credentials_service_1 = require("../../../common/http-client/user-request-credentials.service");
const ayrshare_repository_1 = require("../spi/ayrshare.repository");
const ayrshare_profile_service_1 = require("./ayrshare-profile.service");
let DistributionService = class DistributionService {
    constructor(prisma, ayrshare, ayrshareProfiles, userRequest, urlPresigner) {
        this.prisma = prisma;
        this.ayrshare = ayrshare;
        this.ayrshareProfiles = ayrshareProfiles;
        this.userRequest = userRequest;
        this.urlPresigner = urlPresigner;
    }
    async findByPublicationId(publicationId) {
        return this.prisma.distribution.findMany({
            where: { publicationId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getTopViewedHashtags(limit = 10) {
        var _a, _b;
        try {
            const rows = await this.prisma.distribution.findMany({
                where: { hashtags: { not: null } },
                select: { hashtags: true, viewCount: true },
            });
            const viewsByTag = new Map();
            for (const row of rows) {
                if (!row.hashtags)
                    continue;
                let tags;
                try {
                    tags = JSON.parse(row.hashtags);
                }
                catch {
                    continue;
                }
                const views = (_a = row.viewCount) !== null && _a !== void 0 ? _a : 0;
                for (const t of Array.isArray(tags) ? tags : []) {
                    const tag = typeof t === 'string' ? t.trim() : '';
                    if (!tag)
                        continue;
                    const normalized = tag.startsWith('#') ? tag : `#${tag}`;
                    viewsByTag.set(normalized, ((_b = viewsByTag.get(normalized)) !== null && _b !== void 0 ? _b : 0) + views);
                }
            }
            const items = [...viewsByTag.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, limit)
                .map(([tag, views]) => ({ tag, views }));
            return { items };
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load top hashtags by views';
            return { items: [], error: message };
        }
    }
    async findOne(id) {
        const d = await this.prisma.distribution.findUnique({
            where: { id },
            include: { publication: true },
        });
        if (!d) {
            throw new common_1.NotFoundException(`Distribution ${id} not found`);
        }
        return d;
    }
    async create(publicationId, input) {
        var _a, _b, _c;
        const pub = await this.prisma.publication.findUnique({
            where: { id: publicationId },
        });
        if (!pub) {
            throw new common_1.NotFoundException(`Publication ${publicationId} not found`);
        }
        return this.prisma.distribution.create({
            data: {
                publicationId,
                platform: input.platform,
                status: 'draft',
                postText: (_a = input.postText) !== null && _a !== void 0 ? _a : null,
                mediaUrls: input.mediaUrls ? JSON.stringify(input.mediaUrls) : null,
                scheduledAt: (_b = input.scheduledAt) !== null && _b !== void 0 ? _b : null,
                platformOptions: input.platformOptions
                    ? JSON.stringify(input.platformOptions)
                    : null,
                hashtags: input.hashtags ? JSON.stringify(input.hashtags) : null,
                preferredFormat: (_c = input.preferredFormat) !== null && _c !== void 0 ? _c : null,
            },
        });
    }
    async update(id, input) {
        await this.findOne(id);
        return this.prisma.distribution.update({
            where: { id },
            data: {
                ...(input.postText !== undefined && { postText: input.postText }),
                ...(input.mediaUrls !== undefined && {
                    mediaUrls: input.mediaUrls ? JSON.stringify(input.mediaUrls) : null,
                }),
                ...(input.scheduledAt !== undefined && { scheduledAt: input.scheduledAt }),
                ...(input.platformOptions !== undefined && {
                    platformOptions: JSON.stringify(input.platformOptions),
                }),
                ...(input.hashtags !== undefined && {
                    hashtags: input.hashtags ? JSON.stringify(input.hashtags) : null,
                }),
            },
        });
    }
    async remove(id) {
        const d = await this.prisma.distribution.findUnique({
            where: { id },
            include: { publication: true },
        });
        if (!d) {
            throw new common_1.NotFoundException(`Distribution ${id} not found`);
        }
        if (d.ayrsharePostId) {
            let profileKey;
            if (d.publication.ayrshareProfileId) {
                try {
                    profileKey = await this.ayrshareProfiles.getProfileKeyByIdOnly(d.publication.ayrshareProfileId);
                }
                catch {
                }
            }
            try {
                await this.ayrshare.deletePost(d.ayrsharePostId, profileKey);
            }
            catch {
            }
        }
        await this.prisma.distribution.delete({ where: { id } });
    }
    async markPublicationForReview(publicationId) {
        await this.prisma.distribution.updateMany({
            where: {
                publicationId,
                status: { in: ['draft', 'failed', 'pending', 'processing'] },
            },
            data: { status: 'awaiting_approval' },
        });
    }
    async approvePublicationReview(publicationId) {
        await this.prisma.distribution.updateMany({
            where: { publicationId, status: 'awaiting_approval' },
            data: { status: 'draft' },
        });
    }
    effective(distVal, pubVal) {
        if (distVal != null && distVal !== '')
            return distVal;
        if (pubVal != null && pubVal !== '')
            return pubVal;
        return undefined;
    }
    async publish(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const d = await this.prisma.distribution.findUnique({
            where: { id },
            include: { publication: true },
        });
        if (!d) {
            throw new common_1.NotFoundException(`Distribution ${id} not found`);
        }
        if (d.status !== 'draft') {
            throw new common_1.BadRequestException(`Distribution must be in draft status to publish (current: ${d.status})`);
        }
        const publication = d.publication;
        const postText = (_a = this.effective(d.postText, publication.postText)) !== null && _a !== void 0 ? _a : '';
        let mediaUrls;
        const pubMediaByFormat = publication.mediaUrlsByFormat
            ? JSON.parse(publication.mediaUrlsByFormat)
            : undefined;
        if (d.preferredFormat && ((_b = pubMediaByFormat === null || pubMediaByFormat === void 0 ? void 0 : pubMediaByFormat[d.preferredFormat]) === null || _b === void 0 ? void 0 : _b.length)) {
            mediaUrls = pubMediaByFormat[d.preferredFormat];
        }
        else {
            const mediaUrlsStr = this.effective(d.mediaUrls, publication.mediaUrls);
            mediaUrls = mediaUrlsStr
                ? JSON.parse(mediaUrlsStr)
                : undefined;
        }
        const scheduledAt = (_c = d.scheduledAt) !== null && _c !== void 0 ? _c : publication.scheduledAt;
        const scheduleDate = scheduledAt ? scheduledAt.toISOString() : undefined;
        let resolvedMediaUrls;
        if (mediaUrls === null || mediaUrls === void 0 ? void 0 : mediaUrls.length) {
            try {
                resolvedMediaUrls = await Promise.all(mediaUrls.map(async (url) => {
                    if (url.startsWith('http://') || url.startsWith('https://')) {
                        return url;
                    }
                    const presigned = await this.urlPresigner.presignUrl(url);
                    if (!presigned ||
                        (!presigned.startsWith('http://') && !presigned.startsWith('https://'))) {
                        throw new common_1.BadRequestException(`Media URL could not be resolved to a public URL. Key: ${url.slice(0, 80)}...`);
                    }
                    return presigned;
                }));
            }
            catch (err) {
                if (err instanceof common_1.BadRequestException)
                    throw err;
                const message = err instanceof Error ? err.message : String(err);
                if (/Credentials|SSO|Token|credential/i.test(message)) {
                    throw new common_1.ServiceUnavailableException('AWS credentials are expired or missing. Run: aws sso login');
                }
                throw err;
            }
        }
        const payload = {
            post: postText,
            platforms: [d.platform],
            mediaUrls: resolvedMediaUrls,
            scheduleDate,
        };
        if ((resolvedMediaUrls === null || resolvedMediaUrls === void 0 ? void 0 : resolvedMediaUrls.length) && resolvedMediaUrls.some((u) => u.includes('?'))) {
            payload.isVideo = true;
        }
        const platformOptions = d.platformOptions
            ? JSON.parse(d.platformOptions)
            : undefined;
        if (d.platform === 'youtube' && platformOptions) {
            payload.youTubeOptions = platformOptions;
        }
        if (d.platform === 'tiktok' && platformOptions) {
            payload.tikTokOptions = platformOptions;
        }
        if (d.platform === 'linkedin' && platformOptions) {
            payload.linkedInOptions = platformOptions;
        }
        if (d.platform === 'instagram' && platformOptions) {
            payload.instagramOptions = platformOptions;
        }
        if (d.platform === 'facebook' && platformOptions) {
            payload.faceBookOptions = platformOptions;
        }
        if (d.platform === 'snapchat' && platformOptions) {
            payload.snapChatOptions = platformOptions;
        }
        let profileKey;
        if (publication.ayrshareProfileId) {
            profileKey = await this.ayrshareProfiles.getProfileKeyByIdOnly(publication.ayrshareProfileId);
        }
        else {
            const workspaceId = this.userRequest.workspaceId;
            if (workspaceId) {
                profileKey =
                    (_d = (await this.ayrshareProfiles.getFirstProfileKeyForWorkspace(workspaceId))) !== null && _d !== void 0 ? _d : undefined;
            }
        }
        if (!profileKey) {
            throw new common_1.BadRequestException('No Ayrshare profile is set for this publication and the workspace has no profile. ' +
                'Create a publication with an Ayrshare profile selected, or add a profile (POST /repurposing/ayrshare/profiles).');
        }
        const response = await this.ayrshare.publishPost(payload, profileKey);
        const postIds = (_e = response.postIds) !== null && _e !== void 0 ? _e : [];
        const platformEntry = postIds.find((p) => p.platform === d.platform);
        const platformStatus = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.status;
        const platformPostIdValue = (_f = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.id) !== null && _f !== void 0 ? _f : null;
        const isPlatformPending = platformStatus === 'pending' || platformPostIdValue === 'pending';
        const status = response.status === 'error' || platformStatus === 'failed'
            ? 'error'
            : response.status === 'success' && !isPlatformPending
                ? 'success'
                : 'pending';
        const errorMessage = ((_g = response.errors) === null || _g === void 0 ? void 0 : _g.length)
            ? response.errors.join('; ')
            : (_h = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.error) !== null && _h !== void 0 ? _h : null;
        const postUrl = (_k = (_j = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.postUrl) !== null && _j !== void 0 ? _j : platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.post_url) !== null && _k !== void 0 ? _k : null;
        const ayrsharePostId = (_l = response.id) !== null && _l !== void 0 ? _l : null;
        const updated = await this.prisma.distribution.update({
            where: { id },
            data: {
                status,
                ayrsharePostId,
                platformPostId: platformPostIdValue,
                postUrl,
                errorMessage,
                publishedAt: status === 'success' ? new Date() : null,
            },
        });
        if (status === 'success' && publication.scheduledAt) {
            await this.prisma.publication.update({
                where: { id: publication.id },
                data: { scheduledAt: null },
            });
        }
        return updated;
    }
    async refreshAyrshareStatusForPublication(publicationId) {
        var _a;
        const publication = await this.prisma.publication.findUnique({
            where: { id: publicationId },
            include: { distributions: true },
        });
        if (!publication) {
            throw new common_1.NotFoundException(`Publication ${publicationId} not found`);
        }
        const toRefresh = publication.distributions.filter((d) => !!d.ayrsharePostId && d.ayrsharePostId.trim() !== '');
        let profileKey;
        if (publication.ayrshareProfileId) {
            try {
                profileKey = await this.ayrshareProfiles.getProfileKeyByIdOnly(publication.ayrshareProfileId);
            }
            catch {
            }
        }
        if (!profileKey && this.userRequest.workspaceId) {
            profileKey =
                (_a = (await this.ayrshareProfiles.getFirstProfileKeyForWorkspace(this.userRequest.workspaceId))) !== null && _a !== void 0 ? _a : undefined;
        }
        await Promise.all(toRefresh.map(async (d) => {
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                const response = await this.ayrshare.getPostStatus(d.ayrsharePostId, profileKey);
                const postIds = (_a = response.postIds) !== null && _a !== void 0 ? _a : [];
                const platformLower = ((_b = d.platform) !== null && _b !== void 0 ? _b : '').toLowerCase();
                const platformEntry = postIds.find((p) => { var _a; return ((_a = p.platform) !== null && _a !== void 0 ? _a : '').toLowerCase() === platformLower; });
                const platformStatus = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.status;
                const platformPostIdValue = (_c = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.id) !== null && _c !== void 0 ? _c : null;
                const isPlatformPending = platformStatus === 'pending' || platformPostIdValue === 'pending';
                const status = response.status === 'error' || platformStatus === 'failed'
                    ? 'error'
                    : response.status === 'success' && !isPlatformPending
                        ? 'success'
                        : 'pending';
                const errorMessage = ((_d = response.errors) === null || _d === void 0 ? void 0 : _d.length)
                    ? response.errors.join('; ')
                    : (_e = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.error) !== null && _e !== void 0 ? _e : null;
                const postUrl = (_g = (_f = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.postUrl) !== null && _f !== void 0 ? _f : platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.post_url) !== null && _g !== void 0 ? _g : null;
                await this.prisma.distribution.update({
                    where: { id: d.id },
                    data: {
                        status,
                        platformPostId: platformPostIdValue,
                        postUrl,
                        errorMessage,
                        ...(status === 'success' && { publishedAt: new Date() }),
                    },
                });
                if (status === 'success') {
                    await this.updateViewCountFromAyrshare(d.id, d.ayrsharePostId, d.platform, publication.ayrshareProfileId);
                }
            }
            catch {
            }
        }));
    }
    async handleAyrshareWebhook(payload) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (payload.action !== 'scheduled' || !((_a = payload.id) === null || _a === void 0 ? void 0 : _a.trim())) {
            return {};
        }
        const ayrsharePostId = payload.id.trim();
        const distribution = await this.prisma.distribution.findFirst({
            where: { ayrsharePostId },
            include: { publication: true },
        });
        if (!distribution) {
            return {};
        }
        const ayrshareProfileId = (_c = (_b = distribution.publication) === null || _b === void 0 ? void 0 : _b.ayrshareProfileId) !== null && _c !== void 0 ? _c : undefined;
        const postIds = (_d = payload.postIds) !== null && _d !== void 0 ? _d : [];
        const platformLower = ((_e = distribution.platform) !== null && _e !== void 0 ? _e : '').toLowerCase();
        const platformEntry = postIds.find((p) => { var _a; return ((_a = p.platform) !== null && _a !== void 0 ? _a : '').toLowerCase() === platformLower; });
        const platformStatus = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.status;
        const platformPostIdValue = (_f = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.id) !== null && _f !== void 0 ? _f : null;
        const isPlatformPending = platformStatus === 'pending' || platformPostIdValue === 'pending';
        const status = payload.status === 'error' || platformStatus === 'failed'
            ? 'error'
            : payload.status === 'success' && !isPlatformPending
                ? 'success'
                : 'pending';
        const errorMessage = ((_g = payload.errors) === null || _g === void 0 ? void 0 : _g.length)
            ? payload.errors.join('; ')
            : (_h = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.error) !== null && _h !== void 0 ? _h : null;
        const postUrl = (_k = (_j = platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.postUrl) !== null && _j !== void 0 ? _j : platformEntry === null || platformEntry === void 0 ? void 0 : platformEntry.post_url) !== null && _k !== void 0 ? _k : null;
        await this.prisma.distribution.update({
            where: { id: distribution.id },
            data: {
                status,
                platformPostId: platformPostIdValue,
                postUrl,
                errorMessage,
                ...(status === 'success' && { publishedAt: new Date() }),
            },
        });
        if (status === 'success') {
            await this.updateViewCountFromAyrshare(distribution.id, ayrsharePostId, distribution.platform, (_m = (_l = distribution.publication) === null || _l === void 0 ? void 0 : _l.ayrshareProfileId) !== null && _m !== void 0 ? _m : null);
        }
        return ayrshareProfileId ? { ayrshareProfileId } : {};
    }
    async updateViewCountFromAyrshare(distributionId, ayrsharePostId, platform, ayrshareProfileId) {
        var _a;
        let profileKey;
        if (ayrshareProfileId) {
            try {
                profileKey = await this.ayrshareProfiles.getProfileKeyByIdOnly(ayrshareProfileId);
            }
            catch {
            }
        }
        try {
            const analytics = await this.ayrshare.getPostAnalytics(ayrsharePostId, [platform], profileKey);
            const views = (_a = analytics[platform]) === null || _a === void 0 ? void 0 : _a.views;
            if (typeof views === 'number' && !Number.isNaN(views)) {
                await this.prisma.distribution.update({
                    where: { id: distributionId },
                    data: { viewCount: views },
                });
            }
        }
        catch {
        }
    }
};
exports.DistributionService = DistributionService;
exports.DistributionService = DistributionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ayrshare_repository_1.AyrshareRepository,
        ayrshare_profile_service_1.AyrshareProfileService,
        user_request_credentials_service_1.UserRequestCredentialsService,
        url_presigner_service_1.UrlPresignerService])
], DistributionService);
//# sourceMappingURL=distribution.service.js.map