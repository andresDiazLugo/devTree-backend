const modeEnv = process.env.EXECUTION_VALUES || 'DEV';

const confit = {
    database: {
        username: modeEnv === 'DEV' ? process.env.DB_USERNAME : '',
        password: modeEnv === 'DEV' ? process.env.DB_PASSWORD : '',
        database: modeEnv === 'DEV' ? process.env.DB_NAME : '',
        host: modeEnv === 'DEV' ? process.env.DB_HOST : '',
        dialect: "mysql"
    },
    frontend: {
        origin: modeEnv === 'DEV' ? process.env.FRONTEND_URL : ''
    }
}

export default confit;