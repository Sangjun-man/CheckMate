import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { createArrayCsvWriter } from 'csv-writer';

@Injectable()
export class CsvService {
  constructor(private readonly logger: Logger) {}
  async createCsv(filePath: string) {
    const headerWriter = createArrayCsvWriter({
      path: filePath,
    });
    await headerWriter.writeRecords([['createdAt', 'count']]);
  }

  async checkExistCsv(filePath: string): Promise<any> {
    return fs.existsSync(filePath) ? true : false;
  }

  async appendCsvLine(filePath: string, lineData: any[]): Promise<void> {
    const csvWriter = createArrayCsvWriter({ path: filePath, append: true });
    return csvWriter.writeRecords([lineData]);
  }

  async countLinesAndHeader(filePath: string): Promise<{ lineCount: number }> {
    if (!fs.existsSync(filePath)) {
      await this.createCsv(filePath);
    }
    return new Promise((resolve, reject) => {
      let lineCount = 0;
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', () => {
          lineCount++;
        })
        .on('end', () => resolve({ lineCount }))
        .on('error', (error) => reject(error));
    });
  }
}
