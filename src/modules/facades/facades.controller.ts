import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {FacadesServiceInterface} from './facades-service.interface.js';
import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import HttpError from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import FacadesResponse from './response/facades.response.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';

type ParamsGetFacade = {
  orderId: string;
}

@injectable()
export default class FacadesController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FacadesServiceInterface) private readonly facadesService: FacadesServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes from FacadeController');
    this.addRoute({path: '/:orderId', method: HttpMethod.Get, handler: this.getFacadesByOrderId, middlewares: [new PrivateRouteMiddleware()]})
  }

  public async getFacadesByOrderId(
    {params}: Request<core.ParamsDictionary | ParamsGetFacade>,
    res: Response
  ): Promise<void> {
    const {orderId} = params;
    const facades = await this.facadesService.findByOrderId(orderId);

    if (facades?.length === 0) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'This order has not any facades',
        'FacadesController'
      );
    }

    this.ok(res, fillDTO(FacadesResponse, facades));
  }
}