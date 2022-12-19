import {OrderStatusEnum} from '../types/order-status.enum.js';
import crypto from 'crypto';

export const createOrder = (row: string) => {
  const token = row.replace('\n', '').split('\t');
  const [number, userId1c, name, email, date, agent, status, manufacturedData, texture, patina] = token;

  return {
      number,
      user: {userId1c, name, email},
      date: new Date(date),
      agent,
      manufacturedDate: new Date(manufacturedData),
      status: OrderStatusEnum[status as 'Accepted'|'Paid'|'Fabricating'|'Manufactured'|'Delivering'|'InStock'|'Realized'|'Canceled'],
      texture,
      patina
    };
}

export const createSHA256 = (line: string, salt: string) => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
}