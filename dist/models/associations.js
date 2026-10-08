"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Link_1 = __importDefault(require("./Link"));
User_1.default.hasMany(Link_1.default, {
    foreignKey: "userId",
    as: "links",
});
Link_1.default.belongsTo(User_1.default, {
    foreignKey: "userId",
    as: "user",
});
//# sourceMappingURL=associations.js.map