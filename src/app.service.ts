import { Injectable, Logger } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';

@Injectable()
export class AppService {
  private client: Client;

  constructor(private readonly logger: Logger) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.login();
  }

  private async login() {
    try {
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      this.logger.log(`Logged in as ${this.client.user.tag}!`);
    } catch (error) {
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
}
