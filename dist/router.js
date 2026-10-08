"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("./handlers/index");
const express_validator_1 = require("express-validator");
const validation_1 = require("./middleware/validation");
// import { authenticate } from './middleware/authenticateMio';
const authJuanDeLaTorre_1 = require("./middleware/authJuanDeLaTorre");
const multer_1 = require("./middleware/multer");
const validUrl_1 = require("./utils/validUrl");
const router = (0, express_1.Router)();
//Routing
// Autenticación y Registro
router.post('/auth/register', (0, express_validator_1.body)('handle')
    .notEmpty()
    .withMessage('Handle is required'), (0, express_validator_1.body)('name')
    .notEmpty()
    .withMessage('Name is required'), (0, express_validator_1.body)('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'), validation_1.handleInputErrors, index_1.createAccount);
router.post('/auth/login', (0, express_validator_1.body)('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'), validation_1.handleInputErrors, index_1.login);
router.get('/user', authJuanDeLaTorre_1.authenticate, index_1.getUser);
router.get('/auth/verify', authJuanDeLaTorre_1.authenticate, (req, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});
router.put('/user', authJuanDeLaTorre_1.authenticate, multer_1.uploadMiddleware, (0, express_validator_1.body)('handle')
    .notEmpty()
    .withMessage('Handle is required'), (0, express_validator_1.body)('description')
    .optional(), index_1.updateProfile);
router.put("/link", authJuanDeLaTorre_1.authenticate, (0, express_validator_1.body)("links")
    .isArray()
    .withMessage("links debe ser un array"), (0, express_validator_1.body)("links.*.name")
    .notEmpty()
    .withMessage("El nombre es requerido"), (0, express_validator_1.body)("links.*.url")
    .custom((value, { req, path }) => {
    if (!value) {
        return true;
    }
    if (!(0, validUrl_1.isValidUrl)(value)) {
        const index = Number(path.match(/\[(\d+)\]/)?.[1]);
        const linkName = req.body.links[index].name;
        throw new Error(`La URL de ${linkName} no es válida`);
    }
    return true;
}), (0, express_validator_1.body)("links.*.enabled")
    .isBoolean()
    .withMessage("enabled debe ser boolean"), validation_1.handleInputErrors, index_1.updateLink);
router.get('/link', authJuanDeLaTorre_1.authenticate, index_1.getLink);
router.put('/link/order', authJuanDeLaTorre_1.authenticate, index_1.updateLinkOrder);
router.get('/user/:handle', authJuanDeLaTorre_1.authenticate, index_1.getUserBytHandle);
router.post('/search', (0, express_validator_1.body)('handle')
    .notEmpty()
    .withMessage('El handle es requerido'), validation_1.handleInputErrors, index_1.searchUserByHandle);
exports.default = router;
//# sourceMappingURL=router.js.map