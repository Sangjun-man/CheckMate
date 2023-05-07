import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import {
  createArrayCsvWriter,
  createObjectCsvWriter as createCsvWriter,
} from 'csv-writer';

@Injectable()
export class CsvService {
  async readCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  async writeCsv(
    filePath: string,
    header: any[],
    records: any[],
  ): Promise<void> {
    const csvWriter = createCsvWriter({ path: filePath, header });
    return csvWriter.writeRecords(records);
  }

  async appendCsvLine(filePath: string, lineData: any[]): Promise<void> {
    if (!fs.existsSync(filePath)) {
      const headerWriter = createCsvWriter({
        path: filePath,
        header: [
          { id: 'createdAt', title: 'createdAt' },
          { id: 'count', title: 'count' },
        ],
      });
      await headerWriter.writeRecords([]);
    }

    const csvWriter = createArrayCsvWriter({ path: filePath, append: true });
    return csvWriter.writeRecords([lineData]);
  }
}
