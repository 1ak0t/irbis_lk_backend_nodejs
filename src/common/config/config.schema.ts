import convict from 'convict';
import validators from 'convict-format-with-validator';

convict.addFormats(validators);

export type ConfigSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  JWT_SECRET: string;
}

export const configSchema = convict<ConfigSchema>({
  PORT: {
    doc: 'Port for incoming connection',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_PORT: {
    doc: 'Port for mongodb',
    format: 'port',
    env: 'DB_PORT',
    default: 27017
  },
  DB_NAME: {
    doc: 'Db name',
    format: String,
    env: 'DB_NAME',
    default: 'irbis_lk'
  },
  DB_USER: {
    doc: 'Db user',
    format: String,
    env: 'DB_USER',
    default: null
  },
  DB_PASSWORD: {
    doc: 'Db user password',
    format: String,
    env: 'DB_PASSWORD',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null
  }
});