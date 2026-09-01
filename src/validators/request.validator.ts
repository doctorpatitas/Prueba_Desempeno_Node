import { body, type ValidationChain } from 'express-validator';

export const requestValidator: ValidationChain[] = [
    body('requested_hospital')
        .notEmpty().withMessage('Requested hospital is required')
        .isInt().withMessage('Requested hospital must be an integer'),
    body('medicine')
        .notEmpty().withMessage('Medicine is required')
        .isInt().withMessage('Medicine must be an integer'),
    body('assigned_warehouse')
        .notEmpty().withMessage('Assigned warehouse is required')
        .isInt().withMessage('Assigned warehouse must be an integer'),
    body('initial_state')
        .notEmpty().withMessage('Initial state is required')
        .isIn(['pending', 'in progress', 'completed']).withMessage('Invalid initial state, must be either "pending", "in progress" or "completed"'),
    body('requested_quantity')
        .notEmpty().withMessage('Requested quantity is required')
        .isInt().withMessage('Requested quantity must be an integer')
];