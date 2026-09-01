import { body, type ValidationChain } from 'express-validator';

export const inventoryValidator: ValidationChain[] = [
    body('warehouse_id')
        .notEmpty().withMessage('Warehouse ID is required')
        .isInt().withMessage('Warehouse ID must be an integer'),
    body('medication_id')
        .notEmpty().withMessage('Medication ID is required')
        .isInt().withMessage('Medication ID must be an integer')
];