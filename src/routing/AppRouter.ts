import { Router } from 'express';
import { authRoutes } from './subRoutes/AuthRouter';
import { userRoutes } from './subRoutes/UserRouter';

export const router = Router();

router.use('/auth', authRoutes);

router.use('/users', userRoutes);
