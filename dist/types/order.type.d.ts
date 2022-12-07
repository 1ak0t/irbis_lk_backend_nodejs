import { OrderStatusEnum } from './order-status.enum.js';
export type OrderType = {
    number: string;
    date: string;
    agent: string;
    status: OrderStatusEnum;
    manufacturedData: string;
    texture: string;
    patina: string;
    facades: string;
};
