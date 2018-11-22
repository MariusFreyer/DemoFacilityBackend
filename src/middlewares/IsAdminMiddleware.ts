import { NextFunction, Request, Response } from 'express';

export class IsAdminMiddleware {
    public check(req: Request, res: Response, next: NextFunction) {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).send(
                {
                    success: false,
                    error: {
                        message: 'Permissions denied',
                    },
                });
        }
    }
}

export const isAdminMiddleware: IsAdminMiddleware = new IsAdminMiddleware();