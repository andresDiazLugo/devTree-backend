"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express'); Common js
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const express_1 = __importDefault(require("express")); // ESM EcmaScript Modules
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
//configurar cors
app.use((0, cors_1.default)(cors_2.corsConfig));
// Leer datos
app.use(express_1.default.json());
app.use('/', router_1.default);
exports.default = app;
//# sourceMappingURL=servert.js.map