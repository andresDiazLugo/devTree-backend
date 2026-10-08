"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
exports.upload = (0, multer_1.default)({
    dest: "uploads/", // Specify the destination folder for uploaded files
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        if ((file.mimetype === "image/jpeg" || file.mimetype === "image/png")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only JPEG and PNG images are allowed"));
        }
    }
});
//# sourceMappingURL=multer.js.map