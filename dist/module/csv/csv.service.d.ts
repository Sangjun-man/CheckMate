export declare class CsvService {
    readCsv(filePath: string): Promise<any[]>;
    writeCsv(filePath: string, header: any[], records: any[]): Promise<void>;
    appendCsvLine(filePath: string, lineData: any[]): Promise<void>;
}
