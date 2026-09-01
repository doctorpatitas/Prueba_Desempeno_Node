import { body, type ValidationChain } from 'express-validator';

export const hospitalValidator: ValidationChain[] = [
    body('hospital_nit')
        .notEmpty().withMessage('Hospital NIT is required')
        .isInt().withMessage('Hospital NIT must be an integer'),
    body('hospital_name')
        .notEmpty().withMessage('Hospital name is required')
        .isString().withMessage('Hospital name must be a string'),
    body('manager')
        .notEmpty().withMessage('Manager ID is required')
        .isInt().withMessage('Manager ID must be an integer'),
    body('warehouse_id')
        .notEmpty().withMessage('Warehouse ID is required')
        .isInt().withMessage('Warehouse ID must be an integer')
];