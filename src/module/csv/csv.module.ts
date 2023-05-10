import { Logger, Module } from '@nestjs/common';
import { CsvService } from './csv.service';

@Module({
  providers: [CsvService, Logger],
  exports: [CsvService],
})
export class CsvModule {}
