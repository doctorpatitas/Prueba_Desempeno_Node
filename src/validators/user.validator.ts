import { body, validationResult, type ValidationChain } from 'express-validator';
import { type Request, type Response, type NextFunction } from 'express';

export const userValidator: ValidationChain[] = [
    body('first_name')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string'),
    body('last_name')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('birth_date')
        .notEmpty().withMessage('Birth date is required')
        .isDate().withMessage('Invalid date format'),
    body('rol_name')
        .notEmpty().withMessage('Role is required')
        .isIn(['admin', 'request manager']).withMessage('Invalid role, must be either "admin" or "request manager"'),
    body('document_number')
        .notEmpty().withMessage('Document number is required')
        .isInt().withMessage('Document number must be an integer'),
    body('document_type')
        .notEmpty().withMessage('Document type is required')
        .isIn(['CC', 'CE', 'TI']).withMessage('Invalid document type, must be either "CC", "CE" or "TI"')
];

// Funciona que valida que no hayan errores
export function handleValidationErrors(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next();
}