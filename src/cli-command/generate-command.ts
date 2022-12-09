import {CliCommandInterface} from './cli-command.interface.js';
import {MockDataType} from '../types/mock-data.type.js';
import got from 'got';
import OrderGenerator from '../common/order-generator/order-generator.js';
import TsvFileWriter from '../common/file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockDataType;

  public async execute(...parameters:string[]) {
    const [count, filepath, url] = parameters;
    const orderCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log('Не удалось получить данные с сервера');
    }

    const orderGeneratorString = new OrderGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < orderCount; i++) {
      await tsvFileWriter.write(orderGeneratorString.generate());
    }

    console.log('Файл сгенерирован!');
  }
}