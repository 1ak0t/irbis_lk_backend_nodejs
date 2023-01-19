import {CliCommandInterface} from './cli-command.interface.js';
import TsvFileReader from '../common/file-reader/tsv-file-reader.js';
import {createFacade} from '../utils/common.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import LoggerService from '../common/logger/logger.service.js';
import DatabaseService from '../common/database-client/database.service.js';
import {getURI} from '../utils/db.js';
import {FacadesServiceInterface} from '../modules/facades/facades-service.interface.js';
import {FacadesService} from '../modules/facades/facades-service.js';
import {FacadeModel} from '../modules/facades/facades.entity.js';
import {FacadeType} from '../types/facade.type.js';
import {OrderServiceInterface} from '../modules/order/order-service.interface.js';
import {OrderService} from '../modules/order/order.service.js';
import {OrderModel} from '../modules/order/order.entity.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import ConfigService from '../common/config/config.service.js';

export default class ImportFacadesCommand implements CliCommandInterface {
  public readonly name = '--import-facades';
  private facadeService!: FacadesServiceInterface;
  private orderService!: OrderServiceInterface;
  private databaseService!: DatabaseInterface;
  private configService!: ConfigInterface;
  private logger: LoggerInterface;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new LoggerService();
    this.facadeService = new FacadesService(FacadeModel);
    this.orderService = new OrderService(this.logger, OrderModel);
    this.databaseService = new DatabaseService(this.logger);
    this.configService = new ConfigService(this.logger);

  }

  private async saveFacade(facade: FacadeType) {
    await this.facadeService.create(facade);
  }

  private async onLine(line: string, resolve: () => void) {
    const facade = await createFacade(line, this.orderService);
    await this.saveFacade(facade);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} строк считано`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string): Promise<void> {
    const uri = getURI(
      this.configService.get('DB_USER'),
      this.configService.get('DB_PASSWORD'),
      this.configService.get('DB_HOST'),
      this.configService.get('DB_PORT'),
      this.configService.get('DB_NAME')
    );

    await this.databaseService.connect(uri);

    const fileReader = new TsvFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log('Не удалось импортировать данные');
    }
  }
}