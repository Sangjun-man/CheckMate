"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const csvParser = require("csv-parser");
const csv_writer_1 = require("csv-writer");
let CsvService = class CsvService {
    async readCsv(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }
    async writeCsv(filePath, header, records) {
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({ path: filePath, header });
        return csvWriter.writeRecords(records);
    }
    async appendCsvLine(filePath, lineData) {
        if (!fs.existsSync(filePath)) {
            const headerWriter = (0, csv_writer_1.createObjectCsvWriter)({
                path: filePath,
                header: [
                    { id: 'createdAt', title: 'createdAt' },
                    { id: 'count', title: 'count' },
                ],
            });
            await headerWriter.writeRecords([]);
        }
        const csvWriter = (0, csv_writer_1.createArrayCsvWriter)({ path: filePath, append: true });
        return csvWriter.writeRecords([lineData]);
    }
};
CsvService = __decorate([
    (0, common_1.Injectable)()
], CsvService);
exports.CsvService = CsvService;
//# sourceMappingURL=csv.service.js.map