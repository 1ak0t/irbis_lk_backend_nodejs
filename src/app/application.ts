import {LoggerInterface} from '../common/logger/logger.interface.js';
import ConfigService from '../common/config/config.service.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigService) {
  }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}