import { User } from "../models/User";
import { Document } from "mongoose";
import { GenericService } from "./GenericService";

export class UserService extends GenericService {

    public async getByUsername(username: string): Promise<Document> {
        return await User.findOne({ username }).exec();
    }

}

export const userService = new UserService(User);
