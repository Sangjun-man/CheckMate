import { Logger } from '@nestjs/common';
export declare class AppService {
    private readonly logger;
    private client;
    constructor(logger: Logger);
    private login;
    getGuildPreview(): Promise<import("discord.js").GuildPreview>;
}
