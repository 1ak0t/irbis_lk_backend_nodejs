import { generateRandomValue, getRandomItem } from '../../utils/rundom.js';
import dayjs from 'dayjs';
export default class OrderGenerator {
    constructor(mockData) {
        this.mockData = mockData;
    }
    generate() {
        const number = getRandomItem(this.mockData.number);
        const data = dayjs().add(generateRandomValue(-20, 0), 'day').format();
        const agent = getRandomItem(this.mockData.agent);
        const status = getRandomItem(this.mockData.status);
        const manufacturedData = dayjs().add(generateRandomValue(1, 20), 'day').format();
        const texture = getRandomItem(this.mockData.texture);
        const patina = getRandomItem(this.mockData.patina);
        return [
            number,
            data,
            agent,
            status,
            manufacturedData,
            texture,
            patina
        ].join('\t');
    }
}
//# sourceMappingURL=order-generator.js.map