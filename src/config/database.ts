import { Dialect, Sequelize } from 'sequelize';
import config from '../config/config';
export const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect as Dialect,
  }
);