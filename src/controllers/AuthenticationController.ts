import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import { Document, model } from 'mongoose';
import { UserSchema, IUser } from '../models/User';
import { userService } from '../services/UserService';

const User = model('User', UserSchema);

export class AuthenticationController {

    public register(req: Request, res: Response): void {
        req.body.role = 'user'; // don't allow registering admin users
        const newUser = new User(req.body);
        newUser.save((err: any, user: Document) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public login(req: Request, res: Response): void {
        userService.getByUsername(req.body.username)
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.get('password'), (bcryptErr: Error, same: boolean) => {
                        if (bcryptErr) {
                            res.send(bcryptErr);
                        }
                        if (same) {
                            sign({
                                userId: user.get('_id'),
                                username: user.get('username'),
                                role: user.get('role'),
                            }, process.env.JWT_SECRET, { expiresIn: '1h' }, (jwtErr: Error, token: string) => {
                                if (jwtErr) {
                                    res.send(jwtErr);
                                }
                                res.send({
                                    success: true,
                                    data: {
                                        token,
                                    },
                                });
                            });
                        } else {
                            res.status(401).send({
                                success: false,
                                error: {
                                    message: 'Invalid credentials',
                                },
                            });
                        }
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        error: {
                            message: 'Invalid credentials',
                        },
                    });
                }
            })
            .catch(err => {
                res.status(401).send({
                    success: false,
                    error: {
                        message: 'Invalid credentials',
                    },
                });
            })
    }

    public isLoggedIn(req: Request, res: Response): void {
        res.send({
            success: true,
            data: req.user,
        });
    }
}

export const authenticationController: AuthenticationController = new AuthenticationController();
