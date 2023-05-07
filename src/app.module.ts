import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CsvModule } from './module/csv/csv.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CsvModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
