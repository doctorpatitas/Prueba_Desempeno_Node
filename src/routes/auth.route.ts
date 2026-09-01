// src/routes/auth.routes.ts
import { Router } from 'express';
import { authController, loginController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', loginController.login);

export default router;