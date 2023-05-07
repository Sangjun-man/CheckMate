import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CsvService } from './module/csv/csv.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly csvSevice: CsvService,
  ) {}

  @Get()
  async logDiscordPrecenseCount() {
    const previewData = await this.appService.getGuildPreview();

    const { approximatePresenceCount } = previewData;
    const timeStamp = new Date().toISOString();

    const record = [timeStamp, approximatePresenceCount];

    const filePath = './data.csv';

    await this.csvSevice.appendCsvLine(filePath, record);

    return { approximatePresenceCount, timeStamp };
  }
}
