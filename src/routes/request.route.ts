import express from 'express';
import { requestValidator } from '../validators/request.validator.js';
import { requestPostController, requestGetController } from '../controllers/request.controller.js';
import { handleValidationErrors } from '../validators/user.validator.js';

const route = express.Router();

route.get('/', requestValidator, handleValidationErrors, requestGetController.getRequest);
route.post('/', requestPostController.postRequest);

export default route;