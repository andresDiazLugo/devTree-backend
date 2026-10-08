import { Dialect, Sequelize } from 'sequelize';
import config from '../config/config';
export const sequelize = new Sequelize(
  config.database.databaseURL,
  {
    dialect: config.database.dialect as Dialect,
    logging: false, // Disable logging for cleaner output
  }
);