import {LoggerInterface} from '../common/logger/logger.interface.js';
import ConfigService from '../common/config/config.service.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';
import DatabaseService from '../common/database-client/database.service.js';
import {getURI} from '../utils/db.js';
import {UserModel} from '../modules/user/user.entity.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigService,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseService,
    ) {
  }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);
    const user = await UserModel.create({
      email: 'teasdst@teASDs.te',
      name: 'TesASt',
      userId1c: 'asaasdfsasa',
    });

    console.log(user)

  }
}