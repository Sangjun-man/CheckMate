import { Controller, Get, HttpStatus, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { CsvService } from './module/csv/csv.service';
import { count } from 'console';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly csvService: CsvService,
    private readonly logger: Logger,
  ) {}

  @Get('')
  async logDiscordPrecenseCount() {
    /**
     * guild priview API 조회
     */
    const previewData = await this.appService.getGuildPreview();
    const filePath = process.env.FILE_PATH;
    this.logger.log('preview data 확인:', previewData);

    /*
     * read 과정에서 에러 발생 시 csv 파일 생성
     */
    if (!(await this.csvService.checkExistCsv(filePath)))
      await this.csvService.createCsv(filePath);

    /**
     * record 생성
     */
    const { approximatePresenceCount } = previewData;
    const timeStamp = new Date().toISOString();
    const record = [timeStamp, approximatePresenceCount];

    /**
     * csv 파일에 record Append
     */
    await this.csvService.appendCsvLine(filePath, record);

    const { lineCount } = await this.csvService.countLinesAndHeader(filePath);

    /**
     * 결과 리턴
     */
    return {
      status: HttpStatus.OK,
      message: '로그 추가 완료!',
      lineCount,
    };
  }
}
