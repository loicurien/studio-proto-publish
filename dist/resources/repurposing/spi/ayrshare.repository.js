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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AyrshareRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyrshareRepository = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const AYRSHARE_BASE_URL = 'https://api.ayrshare.com/api';
function redactApiKey(key) {
    if (!key || key.length < 12)
        return key ? '***' : '(none)';
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
}
function normalizeAyrshareErrors(errors) {
    if (!(errors === null || errors === void 0 ? void 0 : errors.length))
        return [];
    return errors
        .map((e) => {
        var _a, _b;
        return typeof e === 'string'
            ? e
            : ((_b = (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : ((e === null || e === void 0 ? void 0 : e.details) ? `Error: ${e.details}` : null)) !== null && _b !== void 0 ? _b : JSON.stringify(e));
    })
        .filter(Boolean);
}
let AyrshareRepository = AyrshareRepository_1 = class AyrshareRepository {
    constructor() {
        this.logger = new common_1.Logger(AyrshareRepository_1.name);
        const apiKey = process.env.AYRSHARE_API_KEY;
        this.client = axios_1.default.create({
            baseURL: AYRSHARE_BASE_URL,
            headers: {
                ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
                'Content-Type': 'application/json',
            },
        });
    }
    requireApiKey() {
        if (!process.env.AYRSHARE_API_KEY) {
            throw new Error('AYRSHARE_API_KEY is not configured');
        }
    }
    async publishPost(params, profileKey) {
        var _a, _b, _c, _d, _e, _f;
        const apiKey = process.env.AYRSHARE_API_KEY;
        this.requireApiKey();
        this.logger.log(`[Ayrshare] Publish request apiKey=${redactApiKey(apiKey)} profileKey=${profileKey ? `${profileKey.slice(0, 8)}...` : '(none)'} platforms=${(_a = params.platforms) === null || _a === void 0 ? void 0 : _a.join(',')}`);
        const headers = {
            'Content-Type': 'application/json',
        };
        if (profileKey) {
            headers['Profile-Key'] = profileKey;
        }
        const body = profileKey ? { ...params, profileKey } : params;
        const { data } = await this.client.post('/post', body, { headers });
        const firstPost = (_b = data.posts) === null || _b === void 0 ? void 0 : _b[0];
        const rawErrors = ((_c = firstPost === null || firstPost === void 0 ? void 0 : firstPost.errors) === null || _c === void 0 ? void 0 : _c.length) ? firstPost.errors : data.errors;
        const normalized = firstPost
            ? {
                status: data.status,
                id: (_d = firstPost.id) !== null && _d !== void 0 ? _d : data.id,
                errors: normalizeAyrshareErrors(rawErrors),
                postIds: (_e = firstPost.postIds) !== null && _e !== void 0 ? _e : data.postIds,
            }
            : {
                status: data.status,
                id: data.id,
                errors: normalizeAyrshareErrors(data.errors),
                postIds: data.postIds,
            };
        this.logger.log(`[Ayrshare] Publish response status=${normalized.status} id=${normalized.id} postIds=${((_f = normalized.postIds) !== null && _f !== void 0 ? _f : []).map((p) => `${p.platform}:${p.id}`).join(',')}`);
        return normalized;
    }
    async getPostStatus(ayrsharePostId, profileKey) {
        var _a, _b, _c, _d;
        this.requireApiKey();
        const headers = {};
        if (profileKey) {
            headers['Profile-Key'] = profileKey;
        }
        const { data } = await this.client.get(`/post/${ayrsharePostId}`, {
            headers: Object.keys(headers).length ? headers : undefined,
        });
        const withPosts = data;
        const firstPost = (_a = withPosts.posts) === null || _a === void 0 ? void 0 : _a[0];
        const rawErrors = (_b = firstPost === null || firstPost === void 0 ? void 0 : firstPost.errors) !== null && _b !== void 0 ? _b : data.errors;
        if (firstPost || data.posts) {
            return {
                status: withPosts.status,
                id: (_c = firstPost === null || firstPost === void 0 ? void 0 : firstPost.id) !== null && _c !== void 0 ? _c : withPosts.id,
                errors: normalizeAyrshareErrors(rawErrors),
                postIds: (_d = firstPost === null || firstPost === void 0 ? void 0 : firstPost.postIds) !== null && _d !== void 0 ? _d : data.postIds,
            };
        }
        return {
            status: data.status,
            id: data.id,
            errors: normalizeAyrshareErrors(data.errors),
            postIds: data.postIds,
        };
    }
    async deletePost(ayrsharePostId, profileKey) {
        this.requireApiKey();
        const headers = {};
        if (profileKey) {
            headers['Profile-Key'] = profileKey;
        }
        const { data } = await this.client.delete('/post', {
            data: { id: ayrsharePostId },
            headers: Object.keys(headers).length ? headers : undefined,
        });
        return data;
    }
    async getPostAnalytics(ayrsharePostId, platforms, profileKey) {
        var _a;
        this.requireApiKey();
        const headers = {
            'Content-Type': 'application/json',
        };
        if (profileKey) {
            headers['Profile-Key'] = profileKey;
        }
        const platformsLower = platforms.map((p) => (p !== null && p !== void 0 ? p : '').toLowerCase());
        const { data } = await this.client.post('/analytics/post', { id: ayrsharePostId, platforms: platformsLower }, { headers });
        const result = {};
        const dataObj = data;
        for (const platform of platforms) {
            const responseKey = Object.keys(dataObj).find((k) => k.toLowerCase() === (platform !== null && platform !== void 0 ? platform : '').toLowerCase());
            const pl = responseKey
                ? dataObj[responseKey]
                : undefined;
            if (!pl || typeof pl !== 'object')
                continue;
            const analytics = (_a = pl.analytics) !== null && _a !== void 0 ? _a : pl;
            const views = this.extractViewsFromAnalytics(platform, analytics);
            if (views != null)
                result[platform] = { views };
        }
        return result;
    }
    extractViewsFromAnalytics(platform, analytics) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const num = (v) => typeof v === 'number' && !Number.isNaN(v) ? v : undefined;
        const pl = platform.toLowerCase();
        if (pl === 'tiktok') {
            return ((_e = (_d = (_c = (_b = (_a = num(analytics.videoViews)) !== null && _a !== void 0 ? _a : num(analytics.reach)) !== null && _b !== void 0 ? _b : num(analytics.playCount)) !== null && _c !== void 0 ? _c : num(analytics.play_count)) !== null && _d !== void 0 ? _d : num(analytics.views)) !== null && _e !== void 0 ? _e : undefined);
        }
        if (pl === 'youtube') {
            return num(analytics.views);
        }
        if (pl === 'instagram' || pl === 'facebook' || pl === 'linkedin') {
            return ((_j = (_h = (_g = (_f = num(analytics.viewsCount)) !== null && _f !== void 0 ? _f : num(analytics.totalVideoViews)) !== null && _g !== void 0 ? _g : num(analytics.mediaView)) !== null && _h !== void 0 ? _h : num(analytics.views)) !== null && _j !== void 0 ? _j : undefined);
        }
        if (pl === 'twitter' || pl === 'x') {
            const video = analytics.video;
            return (_k = num(video === null || video === void 0 ? void 0 : video.viewCount)) !== null && _k !== void 0 ? _k : num(analytics.views);
        }
        return (_l = num(analytics.views)) !== null && _l !== void 0 ? _l : num(analytics.viewsCount);
    }
    async getUserProfile(profileKey) {
        this.requireApiKey();
        const { data } = await this.client.get('/user', {
            headers: {
                'Profile-Key': profileKey,
            },
        });
        return data;
    }
};
exports.AyrshareRepository = AyrshareRepository;
exports.AyrshareRepository = AyrshareRepository = AyrshareRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AyrshareRepository);
//# sourceMappingURL=ayrshare.repository.js.map