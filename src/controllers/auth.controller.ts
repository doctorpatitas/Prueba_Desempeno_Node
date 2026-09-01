import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/users.model.js';
import Roles from '../models/roles.model.js';

export const authController = { register: async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password, birth_date, document_number, document_type, rol_id } = req.body;

        const role = await Roles.findByPk(rol_id);
        
        if(!role){
            return res.status(400).json({message: "Invalid rol ID"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            birth_date,
            document_number,
            document_type,
            rol_id
        });

        const { password: _password, ...userWithoutPassword } = newUser.toJSON();

        res.status(201).json({message: "User registered successfully", data: userWithoutPassword });
    } catch (error) {
        console.log("Unexpected error in server", error);
        res.status(500).json({message: "Error registering user", error });
    }
}}

export const loginController = { login: async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userLogin = await Users.findOne({ where: { email } });

        if(!userLogin){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const passwordValid = await bcrypt.compare(password, userLogin.password);
        
        if(!passwordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const role = await Roles.findByPk(userLogin.rol_id);

        if(!role){
            return res.status(400).json({message: "User has no valid role assigned"});
        }

        const token = jwt.sign(
            { id: userLogin.id, rol_id: userLogin.rol_id, role_name: role.rol_name },
            process.env.JWT_SECRET as string,
            { expiresIn: '8h'}
        );

        res.status(200).json({message: "Login successfully", data: { token } });
    } catch (error) {
        console.log("Unexpected error in server", error);
        res.status(500).json({message: "Error logging in", error });
    }
}}