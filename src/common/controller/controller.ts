import {injectable} from 'inversify';
import {ControllerInterface} from './controller.interface.js';
import {Response, Router} from 'express';
import {LoggerInterface} from '../logger/logger.interface.js';
import {RouteInterface} from '../../types/route.interface.js';
import {StatusCodes} from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';

@injectable()
export abstract class Controller implements ControllerInterface {
  readonly router: Router;

  constructor(protected readonly logger: LoggerInterface) {
    this.router = Router();
  }

  public addRoute(route: RouteInterface) {
    const routeHandler = expressAsyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map(
      (middleware) => expressAsyncHandler(middleware.execute.bind(middleware))
    );

    const allHandlers = middlewares ? [...middlewares, routeHandler] : routeHandler;
    this.router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T) {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  created<T>(res: Response, data: T) {
    this.send(res, StatusCodes.CREATED, data);
  }

  ok<T>(res: Response, data: T) {
    this.send(res, StatusCodes.OK, data);
  }

  noContent<T>(res: Response, data: T) {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}