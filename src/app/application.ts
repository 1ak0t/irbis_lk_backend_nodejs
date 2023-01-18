import {LoggerInterface} from '../common/logger/logger.interface.js';
import ConfigService from '../common/config/config.service.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';
import DatabaseService from '../common/database-client/database.service.js';
import {getURI} from '../utils/db.js';
import express, {Express} from 'express';
import {ControllerInterface} from '../common/controller/controller.interface.js';
import {ExceptionFilterInterface} from '../common/errors/exception-filter.interface.js';
import {AuthenticateMiddleware} from '../common/middlewares/authenticate.middleware.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigService,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseService,
    @inject(Component.OrderController) private orderController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
    @inject(Component.FacadesController) private facadesController: ControllerInterface
    ) {
      this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/orders', this.orderController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/facades', this.facadesController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization...');

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on ${this.config.get('PORT')} port`);
  }
}