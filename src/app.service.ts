import { Injectable, Logger } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';

@Injectable()
export class AppService {
  private client: Client;

  constructor(private readonly logger: Logger) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
  }

  async login() {
    try {
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      this.logger.log(`Logged in as ${this.client.user.tag}!`);
    } catch (error) {
      this.logger.error('Error logging in', error);
    }
  }

  async getGuildPreview(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);

    if (!guild) {
      throw new Error('Guild not found');
    }

    const preview = await guild.fetchPreview();
    return preview;
  }
}
