import { NextFunction, Request, Response } from 'express';

export class IsSupporterMiddleware {
    public check(req: Request, res: Response, next: NextFunction) {
        if (req.user.role === 'supporter' || req.user.role === 'admin') {
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

export const isSupporterMiddleware: IsSupporterMiddleware = new IsSupporterMiddleware();