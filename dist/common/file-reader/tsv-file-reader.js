import { readFileSync } from 'fs';
import { OrderStatusEnum } from '../../types/order-status.enum.js';
export default class TsvFileReader {
    constructor(filename) {
        this.filename = filename;
        this.rawData = '';
    }
    read() {
        this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
    }
    toArray() {
        if (!this.rawData) {
            return [];
        }
        return this.rawData
            .split('\n')
            .filter((row) => row.trim() !== '')
            .map((line) => line.split('\t'))
            .map(([number, date, agent, status, manufacturedData, texture, patina, facades]) => ({
            number,
            date,
            agent,
            manufacturedData,
            status: OrderStatusEnum[status],
            texture,
            patina,
            facades,
        }));
    }
}
//# sourceMappingURL=tsv-file-reader.js.map