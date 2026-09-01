import express from 'express';
import { inventoryPostController, inventoryGetController, inventoryGetByIdController, inventoryPutController, inventoryDeleteController } from '../controllers/inventory.controller.js';
import { handleValidationErrors } from '../validators/user.validator.js';
import { inventoryValidator } from '../validators/inventory.validator.js';
import { verifyToken, authorizeRoles } from '../validators/auth.validator.js';

const route = express.Router();

route.get('/', verifyToken, inventoryValidator, handleValidationErrors, inventoryGetController.getInventory);
route.get('/:id', verifyToken, inventoryValidator, handleValidationErrors, inventoryGetByIdController.getInventoryById);
route.post('/', verifyToken, inventoryValidator, handleValidationErrors, inventoryPostController.createInventory);
route.put('/:id', verifyToken, inventoryValidator, handleValidationErrors, inventoryPutController.updateInventory);
route.delete('/:id', verifyToken, inventoryValidator, handleValidationErrors, inventoryDeleteController.deleteInventory);

export default route;