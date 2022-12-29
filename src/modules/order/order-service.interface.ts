import CreateOrderDto from './dto/create-order.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OrderEntity} from './order.entity.js';

export interface OrderServiceInterface {
  create(dto: CreateOrderDto): Promise<DocumentType<OrderEntity>>;
  getOrderNumbers(): Promise<DocumentType<OrderEntity>[]>;
  findByUserId(orderId: string): Promise<DocumentType<OrderEntity>[] | null>;
  findById1c(id1c: string): Promise<DocumentType<OrderEntity>[] | null>;
}