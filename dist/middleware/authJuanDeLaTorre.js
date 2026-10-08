"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    const error = new Error('No Autorizado');
    if (!bearer) {
        return res.status(401).json({ error: error.message });
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        return res.status(401).json({ error: error.message });
    }
    try {
        const result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.default.findOne({ where: { id: result.id }, attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user?.id);
        console.log(user?.dataValues.id);
        console.log(user?.toJSON());
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authJuanDeLaTorre.js.map