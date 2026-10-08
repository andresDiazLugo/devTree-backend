import UserSchema  from '../models/User';
import LinkSchema from '../models/Link'
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/auth';
import slug from 'slug';
import { generateJWT } from '../utils/jwt';
import cloudinary from '../config/cloudinay'
import fs from "fs/promises";

export const createAccount = async (req: Request, res: Response) => {
    const { name, email, password, handle } = req.body;

    try {
        const existingUser = await UserSchema.findOne({ where: { email } });
        
        if (existingUser) {
           const error = new Error('Email already in use');
           return res.status(409).json({ message: error.message });
        }
        const hashedPassword = await hashPassword(password);

        const newHandle = slug(handle, { lower: true });
        
        const existingHandle = await UserSchema.findOne({ where: { handle: newHandle } });
        
        if (existingHandle) {
            const error = new Error('Handle already in use');
            return res.status(409).json({ message: error.message });
        }

        const newUser = await UserSchema.create(
            { 
                name, 
                email, 
                password: hashedPassword,
                handle: newHandle
        });
        newUser.save();
        console.log('User registered successfully:', newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
        
    } catch (error) {
        console.error('Error registering user:', error);
    }
    
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserSchema.findOne({ where: { email } });
        if (!existingUser) {
            const error = new Error('Invalid email or password');
            return res.status(401).json({ message: error.message });
        }
        const isMatchPassword = await comparePassword(password, existingUser.dataValues.password);   
        if (!isMatchPassword) {
            const error = new Error('Invalid email or password');
            return res.status(401).json({ message: error.message });
        }
        const token = generateJWT({ id: existingUser.dataValues.id, email: existingUser.dataValues.email });
        res.status(200).json({ message: 'Login successful', user: existingUser, token });
    } catch (error) {
        console.error('Error during login:', error);
    }
}

export const getUser = async ( req: Request, res: Response ) => {
   const userId = req.user.id
   const links = await LinkSchema.findAll({
    where: {
        userId,
    },
    order: [['order', 'ASC']]
   })
   res.status(200).json({ user: req.user, links });
}

export const updateProfile = async ( req: Request, res: Response ) => {
   try {
    const { handle, description } = req.body;
    const handleExisting = await UserSchema.findOne({ where: { handle } });
    if (handleExisting && handleExisting.dataValues.id !== req.user.id) {
        const error = new Error('Handle already in use');
        return res.status(409).json({ message: error.message });
    }

    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "users",
        });

        if(req.user.image_public_id){
            await cloudinary.uploader.destroy(req.user.image_public_id);
        }
        if(result){
            req.user.avatar = result.secure_url;
            req.user.image_public_id = result.public_id;
            await fs.unlink(req.file.path)
        }
        await req.user.save();
    }

    req.user.description = description;
    req.user.handle = handle;
    await req.user.save();
    res.status(200).json({ message: 'Profile updated successfully', user: req.user });

   } catch (e) {
    console.log("error",e)
    const error = new Error('Error updating profile');
    return res.status(500).json({ message: error.message });
   }
}

export const updateLink = async (req: Request, res:Response) => {
    const { links } = req.body
    const userId = req.user.id
    for (const link of links) {
        const existingLink = await LinkSchema.findOne({
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
        } else {
            await LinkSchema.create({
            userId,
            name: link.name,
            url: link.url,
            enabled: link.enabled,
            });
        }
    }
    return res.status(200).json({
        message: "Links actualizados correctamente"
    })

}

export const getLink = async ( req: Request, res: Response ) => {
   const userId = req.user.id
   
   const links = await LinkSchema.findAll({
    where: {
       userId
    },
    order: [['order', 'ASC']]
   })

   res.status(200).json(links);
}

export const updateLinkOrder = async (req: Request, res: Response) => {
       try {
        const { links } = req.body;

        if (!Array.isArray(links)) {
            return res.status(400).json({
                message: "El campo links debe ser un array",
            });
        }

        for (const link of links) {
            await LinkSchema.update(
                {
                    order: link.order,
                },
                {
                    where: {
                        id: link.id,
                        userId: req.user.id,
                    },
                }
            );
        }

        return res.status(200).json({
            message: "Orden de links actualizado correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el orden de los links",
        });
    }

}

export const getUserBytHandle = async (req: Request, res: Response) => {
    try {
        const findUser = await UserSchema.findOne({ 
            where: { handle: req.params.handle },
            include: [
                {
                    model: LinkSchema,
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
    } catch (er) {
        const error = new Error('Error al obtener el usuario por handle');
        return res.status(500).json({ message: error.message });
    }
}

export const searchUserByHandle = async (req: Request, res: Response) => {
    try {
        const { handle } = req.body;
        const userExisting = await UserSchema.findOne({ where: { handle } });
        if(userExisting){
            const error = new Error(`${handle} ya está registrado`);
            return res.status(409).json({ message: error.message });  
        } 
        return res.status(200).json({ message: `${handle} está disponible` });
    } catch (er) {
        const error = new Error('Error al obtener el usuario por handle');
        return res.status(500).json({ message: error.message });
    }
}

