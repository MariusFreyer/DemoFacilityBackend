import { Router } from 'express';
import { userController } from '../../controllers/UserController';
import { authenticatedMiddleware } from '../../middlewares/AuthenticatedMiddleware';
import { isAdminMiddleware } from '../../middlewares/isAdminMiddleware';

export const userRoutes = Router();

userRoutes.get('/', authenticatedMiddleware.check, userController.index);
userRoutes.get('/:userId', authenticatedMiddleware.check, userController.getById);
userRoutes.post('/', authenticatedMiddleware.check, userController.store);
userRoutes.post('/:userId', authenticatedMiddleware.check, userController.update);

