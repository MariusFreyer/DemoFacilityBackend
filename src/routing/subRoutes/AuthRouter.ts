import { Router } from 'express';
import { authenticationController } from '../../controllers/AuthenticationController';
import { authenticatedMiddleware } from '../../middlewares/AuthenticatedMiddleware';

export const authRoutes = Router();

authRoutes.post('/register', authenticationController.register);
authRoutes.post('/login', authenticationController.login);
authRoutes.get('/isloggedin', authenticatedMiddleware.check, authenticationController.isLoggedIn);
