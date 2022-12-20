import {OrderStatusEnum} from '../types/order-status.enum.js';
import crypto from 'crypto';
import {OrderServiceInterface} from '../modules/order/order-service.interface.js';
import {generateRandomValue} from './rundom.js';

export const createOrder = (row: string) => {
  const token = row.replace('\n', '').split('\t');
  const [number, userId1c, name, email, date, agent, status, milling, manufacturedData, texture, patina] = token;

  return {
      number,
      user: {userId1c, name, email},
      date: new Date(date),
      agent,
      manufacturedDate: new Date(manufacturedData),
      status: OrderStatusEnum[status as 'Accepted'|'Paid'|'Fabricating'|'Manufactured'|'Delivering'|'InStock'|'Realized'|'Canceled'],
      milling,
      texture,
      patina
    };
}

export const createFacade = async (row: string, orderService: OrderServiceInterface) => {
  const token = row.replace('\n', '').split('\t');
  const [orderId, type, direction, milling,view, cutting, thickness] = token;
  const patina = await orderService.findById1c(orderId).then((result) => result ? result[0].patina : '');
  const texture = await orderService.findById1c(orderId).then((result) => result ? result[0].texture : '');

  return {
    orderId,
    type,
    direction,
    patina,
    milling,
    cutting,
    texture,
    view,
    height: generateRandomValue(150,2350),
    width: generateRandomValue(150,2350),
    thickness,
    square: generateRandomValue(0,6, 3),
    count: generateRandomValue(1,10),
    price: generateRandomValue(1000,3000, 2),
    total: generateRandomValue(1000,15000, 2)
  };
}

export const createSHA256 = (line: string, salt: string) => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
}