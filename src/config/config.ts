const modeEnv = process.env.EXECUTION_VALUES || 'DEV';

const confit = {
    database: {
        databaseURL: modeEnv === 'PROD' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV,
        dialect: "postgres"
    },
    frontend: {
        origin: modeEnv === 'DEV' ? process.env.FRONTEND_URL : ''
    }
}

export default confit;