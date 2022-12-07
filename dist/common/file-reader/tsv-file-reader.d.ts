import { FileReaderInterface } from './file-reader.interface.js';
import { OrderType } from '../../types/order.type.js';
export default class TsvFileReader implements FileReaderInterface {
    filename: string;
    private rawData;
    constructor(filename: string);
    read(): void;
    toArray(): OrderType[];
}
