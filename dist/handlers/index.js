"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUserByHandle = exports.getUserBytHandle = exports.updateLinkOrder = exports.getLink = exports.updateLink = exports.updateProfile = exports.getUser = exports.login = exports.createAccount = void 0;
const User_1 = __importDefault(require("../models/User"));
const Link_1 = __importDefault(require("../models/Link"));
const auth_1 = require("../utils/auth");
const slug_1 = __importDefault(require("slug"));
const jwt_1 = require("../utils/jwt");
const cloudinay_1 = __importDefault(require("../config/cloudinay"));
const promises_1 = __importDefault(require("fs/promises"));
const createAccount = async (req, res) => {
    const { name, email, password, handle } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (existingUser) {
            const error = new Error('Email already in use');
            return res.status(409).json({ message: error.message });
        }
        const hashedPassword = await (0, auth_1.hashPassword)(password);
        const newHandle = (0, slug_1.default)(handle, { lower: true });
        const existingHandle = await User_1.default.findOne({ where: { handle: newHandle } });
        if (existingHandle) {
            const error = new Error('Handle already in use');
            return res.status(409).json({ message: error.message });
        }
        const newUser = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
            handle: newHandle
        });
        newUser.save();
        console.log('User registered successfully:', newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        console.error('Error registering user:', error);
    }
};
exports.createAccount = createAccount;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (!existingUser) {
            const error = new Error('Invalid email or password');
            return res.status(401).json({ message: error.message });
        }
        const isMatchPassword = await (0, auth_1.comparePassword)(password, existingUser.dataValues.password);
        if (!isMatchPassword) {
            const error = new Error('Invalid email or password');
            return res.status(401).json({ message: error.message });
        }
        const token = (0, jwt_1.generateJWT)({ id: existingUser.dataValues.id, email: existingUser.dataValues.email });
        res.status(200).json({ message: 'Login successful', user: existingUser, token });
    }
    catch (error) {
        console.error('Error during login:', error);
    }
};
exports.login = login;
const getUser = async (req, res) => {
    const userId = req.user.id;
    const links = await Link_1.default.findAll({
        where: {
            userId,
        },
        order: [['order', 'ASC']]
    });
    res.status(200).json({ user: req.user, links });
};
exports.getUser = getUser;
const updateProfile = async (req, res) => {
    try {
        const { handle, description } = req.body;
        const handleExisting = await User_1.default.findOne({ where: { handle } });
        if (handleExisting && handleExisting.dataValues.id !== req.user.id) {
            const error = new Error('Handle already in use');
            return res.status(409).json({ message: error.message });
        }
        if (req.file) {
            const result = await cloudinay_1.default.uploader.upload(req.file.path, {
                folder: "users",
            });
            if (req.user.image_public_id) {
                await cloudinay_1.default.uploader.destroy(req.user.image_public_id);
            }
            if (result) {
                req.user.avatar = result.secure_url;
                req.user.image_public_id = result.public_id;
                await promises_1.default.unlink(req.file.path);
            }
            await req.user.save();
        }
        req.user.description = description;
        req.user.handle = handle;
        await req.user.save();
        res.status(200).json({ message: 'Profile updated successfully', user: req.user });
    }
    catch (e) {
        console.log("error", e);
        const error = new Error('Error updating profile');
        return res.status(500).json({ message: error.message });
    }
};
exports.updateProfile = updateProfile;
const updateLink = async (req, res) => {
    const { links } = req.body;
    const userId = req.user.id;
    for (const link of links) {
        const existingLink = await Link_1.default.findOne({
            where: {
                userId,
                name: link.name,
            },
        });
        if (existingLink) {
            await existingLink.update({
                url: link.url,
                enabled: link.enabled,
            });
        }
        else {
            await Link_1.default.create({
                userId,
                name: link.name,
                url: link.url,
                enabled: link.enabled,
            });
        }
    }
    return res.status(200).json({
        message: "Links actualizados correctamente"
    });
};
exports.updateLink = updateLink;
const getLink = async (req, res) => {
    const userId = req.user.id;
    const links = await Link_1.default.findAll({
        where: {
            userId
        },
        order: [['order', 'ASC']]
    });
    res.status(200).json(links);
};
exports.getLink = getLink;
const updateLinkOrder = async (req, res) => {
    try {
        const { links } = req.body;
        if (!Array.isArray(links)) {
            return res.status(400).json({
                message: "El campo links debe ser un array",
            });
        }
        for (const link of links) {
            await Link_1.default.update({
                order: link.order,
            }, {
                where: {
                    id: link.id,
                    userId: req.user.id,
                },
            });
        }
        return res.status(200).json({
            message: "Orden de links actualizado correctamente",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el orden de los links",
        });
    }
};
exports.updateLinkOrder = updateLinkOrder;
const getUserBytHandle = async (req, res) => {
    try {
        const findUser = await User_1.default.findOne({
            where: { handle: req.params.handle },
            include: [
                {
                    model: Link_1.default,
                    as: "links",
                    separate: true,
                    order: [["order", "ASC"]],
                }
            ]
        });
        if (!findUser) {
            const error = new Error('User not found');
            return res.status(404).json({ message: error.message });
        }
        return res.status(200).json({ user: findUser });
    }
    catch (er) {
        const error = new Error('Error al obtener el usuario por handle');
        return res.status(500).json({ message: error.message });
    }
};
exports.getUserBytHandle = getUserBytHandle;
const searchUserByHandle = async (req, res) => {
    try {
        const { handle } = req.body;
        const userExisting = await User_1.default.findOne({ where: { handle } });
        if (userExisting) {
            const error = new Error(`${handle} ya está registrado`);
            return res.status(409).json({ message: error.message });
        }
        return res.status(200).json({ message: `${handle} está disponible` });
    }
    catch (er) {
        const error = new Error('Error al obtener el usuario por handle');
        return res.status(500).json({ message: error.message });
    }
};
exports.searchUserByHandle = searchUserByHandle;
//# sourceMappingURL=index.js.map