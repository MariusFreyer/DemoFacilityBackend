import { Document, Model } from "mongoose";
import { IGenericService } from "./IGenericService";

export abstract class GenericService implements IGenericService {

    private Model: Model<Document>

    public constructor(Model: Model<Document>) {
        this.Model = Model;
    }

    public async getAll(): Promise<Document[]> {
        return await this.Model.find().exec();
    }

    public async getById(id: string): Promise<Document> {
        return await this.Model.findById(id).exec();
    }

    public async store(document: Document): Promise<Document> {
        return await this.Model.create(document);
    }

    public async update(id: string, changes: Object): Promise<Document> {
        return await this.Model.findByIdAndUpdate(id, { $set: changes }, { new: true, runValidators: true }).exec();
    }
}
