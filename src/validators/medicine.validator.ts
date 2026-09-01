import { body, type ValidationChain } from 'express-validator';

export const medicineValidator: ValidationChain[] = [
    body('medication_name')
        .notEmpty().withMessage('Medication name is required')
        .isString().withMessage('Medication name must be a string'),
    body('medication_description')
        .notEmpty().withMessage('Medication description is required')
        .isString().withMessage('Medication description must be a string')
];