import { Request, Response } from 'express';

export interface IResourceController {

    index(req: Request, res: Response): void;

    getById(req: Request, res: Response): void;

    store(req: Request, res: Response): void;

    update(req: Request, res: Response): void;

    delete(req: Request, res: Response): void;

}