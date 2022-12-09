import { OrderGeneratorInterface } from './order-generator.interface.js';
import { MockDataType } from '../../types/mock-data.type.js';
export default class OrderGenerator implements OrderGeneratorInterface {
    private readonly mockData;
    constructor(mockData: MockDataType);
    generate(): string;
}
