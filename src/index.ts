import colors from 'colors';
import server from './servert';
import { sequelize } from './config/database';
import "./models/associations"


const port = process.env.PORT || 4000;


async function startServer() {
    try {
        await sequelize.authenticate();
        console.log(colors.bgBlue.magenta.italic('Connection has been established successfully.'));
        await sequelize.sync({
            // force: true, // This will update the database schema to match the models
        });
        server.listen(port, () => {
            console.log(colors.bgGreen(`Server is running on port ${port}`));
        });
    } catch (error) {
        console.error(colors.bgRed('Error initial server:'), error);
    }
}

startServer();