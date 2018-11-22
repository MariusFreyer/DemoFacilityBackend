import { Document } from "mongoose";

export interface IGenericService {

    getAll(): Promise<Document[]>;
    
    getById(id: string): Promise <Document>;
    
    store(document: Document): Promise <Document>;
    
    update(id: string, changes: Object): Promise <Document>;

}

