import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {OrderServiceInterface} from './order-service.interface.js';

@injectable()
export default class OrderController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OrderServiceInterface) private readonly orderService: OrderServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OrderController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const order = await this.orderService.findByUserId('63a524e3646026a950d2b72c');
    this.send(res, StatusCodes.OK, order);
  }
}