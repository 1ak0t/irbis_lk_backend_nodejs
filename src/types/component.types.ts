export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  OrderServiceInterface: Symbol.for('OrderServiceInterface'),
  OrderModel: Symbol.for('OrderModel'),
  FacadesServiceInterface: Symbol.for('FacadesServiceInterface'),
  FacadeModel: Symbol.for('FacadeModel')
} as const;