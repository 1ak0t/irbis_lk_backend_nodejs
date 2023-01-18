import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {OrderServiceInterface} from './order-service.interface.js';
import {fillDTO} from '../../utils/common.js';
import OrderResponse from './response/order.response.js';
import GetOrderDto from './dto/get-order.dto.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class OrderController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OrderServiceInterface) private readonly orderService: OrderServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OrderController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index, middlewares: [new PrivateRouteMiddleware()]});
  }

  public async index({user}: Request<Record<string, unknown>, Record<string, unknown>, GetOrderDto>, res: Response): Promise<void> {
    const orders = await this.orderService.findByUserId(user.userId);
    const orderResponse = fillDTO(OrderResponse, orders);
    this.send(res, StatusCodes.OK, orderResponse);
  }
}