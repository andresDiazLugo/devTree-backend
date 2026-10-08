import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import UserSchema, {IUser}  from '../models/User';

export const authenticate = async (req, res: Response, next: NextFunction) => {
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
        const result = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number, email: string };
        const user = await UserSchema.findOne({ where: { id: result.id }, attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

console.log(user?.id);
console.log(user?.dataValues.id);
console.log(user?.toJSON());
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}