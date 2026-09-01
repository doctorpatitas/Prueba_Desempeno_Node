import express from 'express';
import { medicinePostController, medicineGetController, medicineGetByIdController, medicinePutController, medicineDeleteController } from '../controllers/medicine.controller.js';
import { handleValidationErrors } from '../validators/user.validator.js';
import { medicineValidator } from '../validators/medicine.validator.js';
import { verifyToken, authorizeRoles } from '../validators/auth.validator.js';

const route = express.Router();

route.get('/', verifyToken, medicineValidator, handleValidationErrors, medicineGetController.getMedicine);
route.get('/:id', verifyToken, medicineValidator, handleValidationErrors, medicineGetByIdController.getMedicineById);
route.post('/', verifyToken, medicineValidator, handleValidationErrors, medicinePostController.createMedicine);
route.put('/:id', verifyToken, medicineValidator, handleValidationErrors, medicinePutController.putMedicine);
route.delete('/:id', verifyToken, medicineValidator, handleValidationErrors, medicineDeleteController.deleteMedicine);

export default route;