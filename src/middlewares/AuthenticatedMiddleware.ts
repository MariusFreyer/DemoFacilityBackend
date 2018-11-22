import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthenticatedMiddleware {

    public check(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            res.status(401).send(
                {
                    success: false,
                    error: {
                        message: 'No token provided.',
                    },
                },
            );
        } else {
            const token = req.headers.authorization.split(' ')[1];
            verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401).send(
                        {
                            success: false,
                            error: {
                                message: 'Invalid token provided',
                            },
                        });
                }
                if (decodedToken) {
                    req.user = decodedToken,
                    next();
                }
            });
        }
    }
}

export const authenticatedMiddleware: AuthenticatedMiddleware = new AuthenticatedMiddleware();
