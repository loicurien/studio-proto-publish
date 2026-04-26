"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AyrshareRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyrshareRepository = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importStar(require("axios"));
const AYRSHARE_BASE_URL = 'https://api.ayrshare.com/api';
const AYRSHARE_CACHE_TTL_MS = 60000;
function redactApiKey(key) {
    if (!key || key.length < 12)
        return key ? '***' : '(none)';
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
}
function truncateForLog(json, maxChars = 14000) {
    if (json.length <= maxChars)
        return json;
    return `${json.slice(0, maxChars)}…[truncated ${json.length - maxChars} chars]`;
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
        this.cache = new Map();
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
    getCached(key) {
        const entry = this.cache.get(key);
        if (!entry || Date.now() >= entry.expiresAt) {
            if (entry)
                this.cache.delete(key);
            return undefined;
        }
        return entry.data;
    }
    setCache(key, data) {
        this.cache.set(key, {
            data,
            expiresAt: Date.now() + AYRSHARE_CACHE_TTL_MS,
        });
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
        this.logger.log(`[Ayrshare] GET /post/${ayrsharePostId} raw=${truncateForLog(JSON.stringify(data))}`);
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
        const cacheKey = `analytics:post:v2:${ayrsharePostId}:${[...platforms].sort().join(',')}:${profileKey !== null && profileKey !== void 0 ? profileKey : ''}`;
        const cached = this.getCached(cacheKey);
        if (cached !== undefined)
            return cached;
        this.requireApiKey();
        const headers = {
            'Content-Type': 'application/json',
        };
        if (profileKey) {
            headers['Profile-Key'] = profileKey;
        }
        const platformsLower = platforms.map((p) => (p !== null && p !== void 0 ? p : '').toLowerCase());
        const { data } = await this.client.post('/analytics/post', { id: ayrsharePostId, platforms: platformsLower }, { headers });
        this.logger.log(`[Ayrshare] POST /analytics/post id=${ayrsharePostId} platforms=${platformsLower.join(',')} raw=${truncateForLog(JSON.stringify(data))}`);
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
            const likes = this.extractLikesFromAnalytics(platform, analytics);
            if (views != null || likes != null) {
                result[platform] = {
                    ...(views != null ? { views } : {}),
                    ...(likes != null ? { likes } : {}),
                };
            }
        }
        this.setCache(cacheKey, result);
        this.logger.log(`[Ayrshare] POST /analytics/post id=${ayrsharePostId} parsed=${JSON.stringify(result)}`);
        return result;
    }
    extractLikesFromAnalytics(platform, analytics) {
        var _a, _b, _c;
        const num = (v) => typeof v === 'number' && !Number.isNaN(v) ? v : undefined;
        const pl = platform.toLowerCase();
        if (pl === 'youtube') {
            return num(analytics.likes);
        }
        if (pl === 'tiktok') {
            return num(analytics.likeCount);
        }
        if (pl === 'instagram' || pl === 'facebook') {
            const reactions = analytics.reactions;
            const reactionTotal = num(reactions === null || reactions === void 0 ? void 0 : reactions.total);
            return (_a = num(analytics.likeCount)) !== null && _a !== void 0 ? _a : reactionTotal;
        }
        if (pl === 'linkedin') {
            return num(analytics.likeCount);
        }
        if (pl === 'twitter' || pl === 'x') {
            const pubM = analytics.publicMetrics;
            const orgM = analytics.organicMetrics;
            return (_b = num(pubM === null || pubM === void 0 ? void 0 : pubM.likeCount)) !== null && _b !== void 0 ? _b : num(orgM === null || orgM === void 0 ? void 0 : orgM.likeCount);
        }
        if (pl === 'threads') {
            return num(analytics.likes);
        }
        if (pl === 'bluesky') {
            return num(analytics.likeCount);
        }
        if (pl === 'pinterest') {
            return num(analytics.totalReactions);
        }
        if (pl === 'reddit') {
            return num(analytics.ups);
        }
        if (pl === 'snapchat') {
            return undefined;
        }
        return (_c = num(analytics.likeCount)) !== null && _c !== void 0 ? _c : num(analytics.likes);
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
    async getSocialAnalytics(platforms, options = {}, profileKey) {
        var _a, _b, _c, _d, _e, _f;
        const cacheKey = `analytics:social:${[...platforms].sort().join(',')}:${(_a = options.daily) !== null && _a !== void 0 ? _a : ''}:${(_b = options.quarters) !== null && _b !== void 0 ? _b : ''}:${(_c = options.aggregate) !== null && _c !== void 0 ? _c : ''}:${profileKey !== null && profileKey !== void 0 ? profileKey : ''}`;
        const cached = this.getCached(cacheKey);
        if (cached !== undefined)
            return cached;
        this.requireApiKey();
        const body = {
            platforms: platforms.map((p) => p.toLowerCase()),
        };
        if (options.daily === true)
            body.daily = true;
        if (options.quarters != null)
            body.quarters = options.quarters;
        if (options.aggregate === true)
            body.aggregate = true;
        const headers = {
            'Content-Type': 'application/json',
        };
        if (profileKey)
            headers['Profile-Key'] = profileKey;
        try {
            const { data } = await this.client.post('/analytics/social', body, { headers });
            const result = data !== null && data !== void 0 ? data : {};
            this.logger.log(`[Ayrshare] POST /analytics/social platforms=${body.platforms} daily=${body.daily === true} raw=${truncateForLog(JSON.stringify(result))}`);
            this.setCache(cacheKey, result);
            return result;
        }
        catch (err) {
            if ((0, axios_1.isAxiosError)(err)) {
                const status = (_d = err.response) === null || _d === void 0 ? void 0 : _d.status;
                const resBody = (_e = err.response) === null || _e === void 0 ? void 0 : _e.data;
                const message = typeof (resBody === null || resBody === void 0 ? void 0 : resBody.message) === 'string'
                    ? resBody.message
                    : Array.isArray(resBody === null || resBody === void 0 ? void 0 : resBody.errors)
                        ? resBody.errors.join('; ')
                        : (_f = err.message) !== null && _f !== void 0 ? _f : 'Ayrshare social analytics request failed';
                this.logger.warn(`[Ayrshare] getSocialAnalytics failed status=${status} message=${message}`);
                throw new common_1.BadGatewayException(`Ayrshare analytics: ${message}`);
            }
            throw err;
        }
    }
};
exports.AyrshareRepository = AyrshareRepository;
exports.AyrshareRepository = AyrshareRepository = AyrshareRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AyrshareRepository);
//# sourceMappingURL=ayrshare.repository.js.map