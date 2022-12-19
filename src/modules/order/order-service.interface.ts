import CreateOrderDto from './dto/create-order.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OrderEntity} from './order.entity.js';

export interface OrderServiceInterface {
  create(dto: CreateOrderDto): Promise<DocumentType<OrderEntity>>;
  findById(orderId: string): Promise<DocumentType<OrderEntity> | null>;
}