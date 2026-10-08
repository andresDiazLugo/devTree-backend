"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const config_1 = __importDefault(require("./config"));
exports.corsConfig = {
    origin: [config_1.default.frontend.origin],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
//# sourceMappingURL=cors.js.map