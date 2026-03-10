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
exports.UserRequestCredentialsService = exports.WORKSPACE_ID_HEADER = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
exports.WORKSPACE_ID_HEADER = 'X-Nb-Workspace';
let UserRequestCredentialsService = class UserRequestCredentialsService {
    get workspaceId() {
        var _a, _b, _c;
        const req = this.request;
        const raw = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a[exports.WORKSPACE_ID_HEADER]) !== null && _b !== void 0 ? _b : (_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c['x-nb-workspace'];
        return typeof raw === 'string' && raw.trim() ? raw : 'default-workspace';
    }
    constructor(request) {
        this.request = request;
    }
};
exports.UserRequestCredentialsService = UserRequestCredentialsService;
exports.UserRequestCredentialsService = UserRequestCredentialsService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], UserRequestCredentialsService);
//# sourceMappingURL=user-request-credentials.service.js.map