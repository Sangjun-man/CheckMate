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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const discord_js_1 = require("discord.js");
let AppService = class AppService {
    constructor(logger) {
        this.logger = logger;
        this.client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
        this.login();
    }
    async login() {
        try {
            await this.client.login(process.env.DISCORD_BOT_TOKEN);
            this.logger.log(`Logged in as ${this.client.user.tag}!`);
        }
        catch (error) {
            this.logger.error('Error logging in', error);
        }
    }
    async getGuildPreview() {
        this.logger.log(process.env.GUILD_ID);
        const guild = this.client.guilds.cache.get(process.env.GUILD_ID);
        if (!guild) {
            throw new Error('Guild not found');
        }
        const preview = await guild.fetchPreview();
        return preview;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map