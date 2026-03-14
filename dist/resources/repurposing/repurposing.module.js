"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepurposingModule = void 0;
const common_1 = require("@nestjs/common");
const url_presigner_module_1 = require("../../common/url-presigner/url-presigner.module");
const http_client_module_1 = require("../../common/http-client/http-client.module");
const ayrshare_repository_1 = require("./spi/ayrshare.repository");
const trends_repository_1 = require("./spi/trends.repository");
const publication_service_1 = require("./domain/publication.service");
const distribution_service_1 = require("./domain/distribution.service");
const ayrshare_profile_service_1 = require("./domain/ayrshare-profile.service");
const ayrshare_webhook_event_service_1 = require("./domain/ayrshare-webhook-event.service");
const publications_controller_1 = require("./api/publications.controller");
const distributions_controller_1 = require("./api/distributions.controller");
const ayrshare_controller_1 = require("./api/ayrshare.controller");
const trends_controller_1 = require("./api/trends.controller");
const webhooks_controller_1 = require("./api/webhooks.controller");
let RepurposingModule = class RepurposingModule {
};
exports.RepurposingModule = RepurposingModule;
exports.RepurposingModule = RepurposingModule = __decorate([
    (0, common_1.Module)({
        imports: [url_presigner_module_1.UrlPresignerModule, http_client_module_1.HttpClientModule],
        controllers: [
            publications_controller_1.PublicationsController,
            distributions_controller_1.DistributionsController,
            ayrshare_controller_1.AyrshareController,
            trends_controller_1.TrendsController,
            webhooks_controller_1.WebhooksController,
        ],
        providers: [
            ayrshare_repository_1.AyrshareRepository,
            trends_repository_1.TrendsRepository,
            publication_service_1.PublicationService,
            distribution_service_1.DistributionService,
            ayrshare_profile_service_1.AyrshareProfileService,
            ayrshare_webhook_event_service_1.AyrshareWebhookEventService,
        ],
    })
], RepurposingModule);
//# sourceMappingURL=repurposing.module.js.map