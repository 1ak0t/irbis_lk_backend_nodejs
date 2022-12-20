import {OrderServiceInterface} from './order-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OrderEntity} from './order.entity.js';
import CreateOrderDto from './dto/create-order.dto.js';

@injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OrderModel) private readonly orderModel: types.ModelType<OrderEntity>
  ) {}

  public async create(dto: CreateOrderDto): Promise<DocumentType<OrderEntity>> {
    const result = await this.orderModel.create(dto);

    this.logger.info(`New order created ${dto.number}`);

    return result;
  }

  public async findById(orderId: string): Promise<DocumentType<OrderEntity> | null> {
    return this.orderModel.findById(orderId).exec();
  }

  public async findById1c(id1c: string): Promise<DocumentType<OrderEntity>[] | null> {
    return this.orderModel.find({number: id1c}).exec();
  }
}