import 'reflect-metadata';
import LoggerService from './common/logger/logger.service.js';
import Application from './app/application.js';
import ConfigService from './common/config/config.service.js';
import {ConfigInterface} from './common/config/config.interface.js';
import {Container} from 'inversify';
import {Component} from './types/component.types.js';
import {LoggerInterface} from './common/logger/logger.interface.js';
import {DatabaseInterface} from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import mongoose from 'mongoose';
import {UserServiceInterface} from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './modules/user/user.entity.js';
import {OrderServiceInterface} from './modules/order/order-service.interface.js';
import {OrderService} from './modules/order/order.service.js';
import {OrderEntity, OrderModel} from './modules/order/order.entity.js';

mongoose.set('strictQuery', false);

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<OrderServiceInterface>(Component.OrderServiceInterface).to(OrderService);
applicationContainer.bind<types.ModelType<OrderEntity>>(Component.OrderModel).toConstantValue(OrderModel);
const application = applicationContainer.get<Application>(Component.Application);

await application.init();