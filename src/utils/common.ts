import {OrderStatusEnum} from '../types/order-status.enum.js';

export const createOrder = (row: string) => {
  const token = row.replace('\n', '').split('\t');
  const [number, date, agent, status, manufacturedData, texture, patina] = token;

  return {
      number,
      date: new Date(date),
      agent,
      manufacturedData: new Date(manufacturedData),
      status: OrderStatusEnum[status as 'Accepted'|'Paid'|'Fabricating'|'Manufactured'|'Delivering'|'InStock'|'Realized'|'Canceled'],
      texture,
      patina
    };
}