import {CliCommandInterface} from './cli-command.interface.js';
import TsvFileReader from '../common/file-reader/tsv-file-reader.js';
import {createOrder} from '../utils/common.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {OrderServiceInterface} from '../modules/order/order-service.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import LoggerService from '../common/logger/logger.service.js';
import UserService from '../modules/user/user.service.js';
import {UserModel} from '../modules/user/user.entity.js';
import {OrderService} from '../modules/order/order.service.js';
import {OrderModel} from '../modules/order/order.entity.js';
import DatabaseService from '../common/database-client/database.service.js';
import {OrderType} from '../types/order.type.js';
import {getURI} from '../utils/db.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private orderService!: OrderServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new LoggerService();
    this.userService = new UserService(this.logger, UserModel);
    this.orderService = new OrderService(this.logger, OrderModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOrder(order: OrderType) {
    const user = await this.userService.findOrCreate({
      ...order.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.orderService.create({
      ...order,
      userId1c: user.userId1c,
      userId: user.id,
    })
  }

  private async onLine(line: string, resolve: () => void) {
    const order = createOrder(line);
    await this.saveOrder(order);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} строк считано`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

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