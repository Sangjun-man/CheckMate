import { AppService } from './app.service';
import { CsvService } from './module/csv/csv.service';
export declare class AppController {
    private readonly appService;
    private readonly csvSevice;
    constructor(appService: AppService, csvSevice: CsvService);
    logDiscordPrecenseCount(): Promise<{
        approximatePresenceCount: number;
        timeStamp: string;
    }>;
}
