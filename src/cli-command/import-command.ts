import {CliCommandInterface} from './cli-command.interface.js';
import TsvFileReader from '../common/file-reader/tsv-file-reader.js';
import {createOrder} from '../utils/common.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const order = createOrder(line);
    console.log(order);
  }

  private onComplete(count: number) {
    console.log(`${count} строк считано`);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TsvFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log('Не удалось импортировать данные');
    }
  }
}