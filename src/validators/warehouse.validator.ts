import { body, type ValidationChain } from 'express-validator';

export const warehouseValidator: ValidationChain[] = [
    body('warehouse_name')
        .notEmpty().withMessage('Warehouse name is required')
        .isString().withMessage('Warehouse name must be a string')
];