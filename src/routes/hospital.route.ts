import express from 'express';
import { hospitalPostController, hospitalGetController, hospitalGetByIdController, hospitalPutController, hospitalDeleteController } from '../controllers/hospital.controller.js';
import { handleValidationErrors } from '../validators/user.validator.js';
import { hospitalValidator } from '../validators/hospital.validator.js';
import { verifyToken, authorizeRoles } from '../validators/auth.validator.js';

const route = express.Router();

route.get('/', verifyToken, hospitalValidator, handleValidationErrors, hospitalGetController.getHospital);
route.get('/:id', verifyToken, hospitalValidator, handleValidationErrors, hospitalGetByIdController.getHospitalById);
route.post('/', verifyToken, hospitalValidator, handleValidationErrors, hospitalPostController.createHospital);
route.put('/:id', verifyToken, hospitalValidator, handleValidationErrors, hospitalPutController.putHospital);
route.delete('/:id', verifyToken, hospitalValidator, handleValidationErrors, hospitalDeleteController.deleteHospital);

export default route;