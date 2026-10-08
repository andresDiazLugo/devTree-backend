"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../utils/multer");
const uploadMiddleware = (req, res, next) => {
    multer_2.upload.single("avatar")(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    message: "La imagen supera los 5 MB",
                });
            }
            return res.status(400).json({
                message: err.message,
            });
        }
        if (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
        next();
    });
};
exports.uploadMiddleware = uploadMiddleware;
//# sourceMappingURL=multer.js.map