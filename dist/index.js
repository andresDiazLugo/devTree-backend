"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const servert_1 = __importDefault(require("./servert"));
const database_1 = require("./config/database");
require("./models/associations");
const port = process.env.PORT || 4000;
async function startServer() {
    try {
        await database_1.sequelize.authenticate();
        console.log(colors_1.default.bgBlue.magenta.italic('Connection has been established successfully.'));
        await database_1.sequelize.sync({
        // force: true, // This will update the database schema to match the models
        });
        servert_1.default.listen(port, () => {
            console.log(colors_1.default.bgGreen(`Server is running on port ${port}`));
        });
    }
    catch (error) {
        console.error(colors_1.default.bgRed('Error initial server:'), error);
    }
}
startServer();
//# sourceMappingURL=index.js.map