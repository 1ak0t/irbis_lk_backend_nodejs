import got from 'got';
import OrderGenerator from '../common/order-generator/order-generator.js';
import { appendFile } from 'fs/promises';
export default class GenerateCommand {
    constructor() {
        this.name = '--generate';
    }
    async execute(...parameters) {
        const [count, filepath, url] = parameters;
        const orderCount = Number.parseInt(count, 10);
        try {
            this.initialData = await got.get(url).json();
        }
        catch {
            return console.log('Не удалось получить данные с сервера');
        }
        const orderGeneratorString = new OrderGenerator(this.initialData);
        for (let i = 0; i < orderCount; i++) {
            await appendFile(filepath, `${orderGeneratorString.generate()}\n`, 'utf-8');
        }
        console.log('Файл сгенерирован!');
    }
}
//# sourceMappingURL=generate-command.js.map