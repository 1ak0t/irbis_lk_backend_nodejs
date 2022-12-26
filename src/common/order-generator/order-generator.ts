import {OrderGeneratorInterface} from './order-generator.interface.js';
import {MockOrderType} from '../../types/mock-order.type.js';
import {generateRandomValue, getRandomItem} from '../../utils/rundom.js';
import dayjs from 'dayjs';

export default class OrderGenerator implements OrderGeneratorInterface {
  constructor(private readonly mockData: MockOrderType) {}

  public generate(): string {
    const number = generateRandomValue(1000000, 9999999);
    const userId1c = getRandomItem<string>(this.mockData.userId1c);
    const partner = getRandomItem<string>(this.mockData.partner);
    const email = getRandomItem<string>(this.mockData.email);
    const data = dayjs().add(generateRandomValue(-20, 0), 'day').format();
    const agent = getRandomItem<string>(this.mockData.agent);
    const status = getRandomItem<string>(this.mockData.status);
    const milling = getRandomItem<string>(this.mockData.milling);
    const manufacturedData = dayjs().add(generateRandomValue(1, 20), 'day').format();
    const texture = getRandomItem<string>(this.mockData.texture);
    const patina = getRandomItem<string>(this.mockData.patina);

    return [
      number,
      userId1c,
      partner,
      email,
      data,
      agent,
      status,
      milling,
      manufacturedData,
      texture,
      patina
    ].join('\t');
  }
}