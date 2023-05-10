import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
      this.logger.log(`${this.client.user.tag}에 로그인`);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        '로그인 과정에서 문제가 발생했습니다.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getGuildPreview() {
    this.logger.log(process.env.GUILD_ID);
    const guild = this.client.guilds.cache.get(process.env.GUILD_ID);

    if (!guild) {
      throw new HttpException(
        'Guild를 찾을 수 없습니다. discord Bot 로그인 유무를 확인해주세요',
        HttpStatus.BAD_REQUEST,
      );
    }

    const preview = await guild.fetchPreview();
    return preview;
  }
}
