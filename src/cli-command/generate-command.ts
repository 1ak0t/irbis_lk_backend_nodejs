import {CliCommandInterface} from './cli-command.interface.js';
import {MockOrderType} from '../types/mock-order.type.js';
import got from 'got';
import OrderGenerator from '../common/order-generator/order-generator.js';
import TsvFileWriter from '../common/file-writer/tsv-file-writer.js';
import {MockFacadeType} from '../types/mock-facade.type.js';
import FacadeGenerator from '../common/facade-generator/facade-generator.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialOrders!: MockOrderType;
  private initialFacades!: MockFacadeType;
  private mocks!: any;

  private getGenerator(mocks: any, filepath: string) {
    if(filepath.includes('orders')) {
      this.initialOrders = mocks;
      return new OrderGenerator(this.initialOrders);
    } else {
      this.initialFacades = mocks;
      return new FacadeGenerator(this.initialFacades);
    }
  }

  public async execute(...parameters:string[]) {
    const [count, filepath, url] = parameters;
    const orderCount = Number.parseInt(count, 10);

    try {
      this.mocks = await got.get(url).json();
    } catch {
      return console.log('Не удалось получить данные с сервера');
    }

    const generator = this.getGenerator(this.mocks, filepath);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < orderCount; i++) {
      await tsvFileWriter.write(generator.generate());
    }

    console.log('Файл сгенерирован!');
  }
}