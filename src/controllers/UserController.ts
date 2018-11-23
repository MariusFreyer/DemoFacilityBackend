import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { User } from '../models/User';
import { IResourceController } from './IResourceController';
import { userService, UserService } from '../services/UserService';
import { ResourceController } from './ResourceController';

export class UserController extends ResourceController {

    public constructor(service: UserService) {
        super(service);
    }

    // /**
    //  * Returns a list of users
    //  * @param req Request for specifc set of users
    //  * @param res Response of specific set of users
    //  */
    // public index(req: Request, res: Response): void {
    //     userService.getAll()
    //         .then(users => res.json(users))
    //         .catch(err => console.log(err));
    // }

    // /**
    //  * Returns a specific user
    //  * @param req Request for specifc userId as UUID
    //  * @param res Response of specific user
    //  */
    // public getById(req: Request, res: Response): void {
    //     userService.getById(req.params.userId)
    //         .then(user => res.send(user))
    //         .catch(err => console.log(err));

    // }

    // /**
    //  * Stores a user
    //  * @param req Body of user
    //  * @param res Response of newly created user
    //  */
    // public store(req: Request, res: Response): void {
    //     const newUser: Document = new User(req.body);
    //     userService.store(newUser)
    //         .then(user => {
    //             res.send(user);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    // public update(req: Request, res: Response): void {
    //     const changes = req.body;
    //     userService.update(req.params.userId, changes)
    //         .then(user => {
    //             res.send(user);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    // public delete(req: Request, res: Response): void {
    //     throw new Error('Method not implemented.');
    // }
}

export const userController: UserController = new UserController(userService);
