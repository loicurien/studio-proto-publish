"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetUrlSignerService = void 0;
const common_1 = require("@nestjs/common");
const DEFAULT_BASE_URL = 'https://api-internal.momentslab.dev';
const DEFAULT_EXPIRATION_MINUTES = 525600;
let AssetUrlSignerService = class AssetUrlSignerService {
    constructor() {
        var _a;
        this.baseUrl = ((_a = process.env.MOMENTSLAB_ASSETS_BASE_URL) === null || _a === void 0 ? void 0 : _a.trim()) || DEFAULT_BASE_URL;
        this.expiration = Number(process.env.MOMENTSLAB_ASSETS_EXPIRATION_MINUTES) ||
            DEFAULT_EXPIRATION_MINUTES;
    }
    buildSignedAssetUrl(storageKey, bearerToken, wuid) {
        const path = '/api/v2/assets';
        const params = new URLSearchParams({
            storage_key: storageKey,
            bearer_token: bearerToken,
            wuid,
            expiration: String(this.expiration),
        });
        return `${this.baseUrl.replace(/\/$/, '')}${path}?${params.toString()}`;
    }
};
exports.AssetUrlSignerService = AssetUrlSignerService;
exports.AssetUrlSignerService = AssetUrlSignerService = __decorate([
    (0, common_1.Injectable)()
], AssetUrlSignerService);
//# sourceMappingURL=asset-url-signer.service.js.map