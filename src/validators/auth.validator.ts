import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

export interface AuthPayLoad {
    id: number;
    rol_id: number; 
    rol_name: string;
}

export interface AuthenticatedRequest extends Request {
    user?: AuthPayLoad;
}

export const verifyToken = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "No token provided"});
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "Malformed authorization header"});
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayLoad;
        req.user = payload;
        next();
    } catch (error) {
        res.status(403).json({message: "Invalid or expired token"})
    }
}

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if(!req.user || !allowedRoles.includes(req.user.rol_name)){
            return res.status(403).json({message: "You don't have permission to perform this action"});
        }
        next();
    }
}