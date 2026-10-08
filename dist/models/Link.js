"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
// 3. Clase que extiende Model
class Link extends sequelize_1.Model {
    userId;
}
// 4. Inicializar modelo
Link.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.ENUM("facebook", "github", "instagram", "x", "youtube", "tiktok", "twitch", "linkedin"),
        allowNull: false
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "Link",
});
exports.default = Link;
//# sourceMappingURL=Link.js.map