import {FileReaderInterface} from './file-reader.interface.js';
import {readFileSync} from 'fs';
import {OrderType} from '../../types/order.type.js';
import {OrderStatusEnum} from '../../types/order-status.enum.js';

export default class TsvFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): OrderType[] {
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
        status: OrderStatusEnum[status as 'Accepted'|'Paid'|'Fabricating'|'Manufactured'|'Delivering'|'InStock'|'Realized'|'Canceled'],
        texture,
        patina,
        facades,
      }));
  }
}