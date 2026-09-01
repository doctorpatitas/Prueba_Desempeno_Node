import express from 'express';
import { warehousePostController, warehouseGetController, warehouseGetByIdController, warehousePutController, warehouseDeleteController } from '../controllers/warehouse.controller.js';
import { handleValidationErrors } from '../validators/user.validator.js';
import { warehouseValidator } from '../validators/warehouse.validator.js';
import { verifyToken, authorizeRoles } from '../validators/auth.validator.js';

const route = express.Router();

route.get('/', verifyToken, warehouseValidator, handleValidationErrors, warehouseGetController.getWarehouse);
route.get('/:id', verifyToken, warehouseValidator, handleValidationErrors, warehouseGetByIdController.getWarehouseById);
route.post('/', verifyToken, warehouseValidator, handleValidationErrors, warehousePostController.createWarehouse);
route.put('/:id', verifyToken, warehouseValidator, handleValidationErrors, warehousePutController.putWarehouse);
route.delete('/:id', verifyToken, warehouseValidator, handleValidationErrors, warehouseDeleteController.deleteWarehouse);

export default route;