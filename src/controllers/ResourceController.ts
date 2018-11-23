import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import { IResourceController } from './IResourceController';
import { userService } from '../services/UserService';
import { GenericService } from '../services/GenericService';
import { IGenericService } from 'services/IGenericService';

export class ResourceController implements IResourceController {

    protected service: IGenericService;

    public constructor(service: IGenericService) {
        this.service = service;
    }

    /**
     * Returns a list of users
     * @param req Request for specifc set of users
     * @param res Response of specific set of users
     */
    public index(req: Request, res: Response): void {
        this.service.getAll()
            .then(users => res.json(users))
            .catch(err => console.log(err));
    }

    /**
     * Returns a specific user
     * @param req Request for specifc userId as UUID
     * @param res Response of specific user
     */
    public getById(req: Request, res: Response): void {
        this.service.getById(req.params.userId)
            .then(user => res.send(user))
            .catch(err => console.log(err));

    }

    /**
     * Stores a user
     * @param req Body of user
     * @param res Response of newly created user
     */
    public store(req: Request, res: Response): void {
        const newDocument: Document = new Model(req.body);
        userService.store(newDocument)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                console.log(err);
            });
    }

    public update(req: Request, res: Response): void {
        const changes = req.body;
        userService.update(req.params.userId, changes)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                console.log(err);
            });
    }

    public delete(req: Request, res: Response): void {
        throw new Error('Method not implemented.');
    }
}