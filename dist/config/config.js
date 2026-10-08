"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modeEnv = process.env.EXECUTION_VALUES || 'DEV';
const confit = {
    database: {
        databaseURL: modeEnv === 'PROD' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV,
        dialect: "postgres"
    },
    frontend: {
        origin: modeEnv === 'DEV' ? process.env.FRONTEND_URL : ''
    }
};
exports.default = confit;
//# sourceMappingURL=config.js.map