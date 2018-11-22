import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { router } from './routing/AppRouter';

class App {

    public app: express.Application;
    public router: express.Router;
    public mongoUrl: string = this.mongoUrl = 'mongodb://localhost:27017/testDB';

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use('/api', router);
    }

    private mongoSetup(): void {
        (mongoose as any).Promise = global.Promise;
        mongoose.connect((this.mongoUrl), { useNewUrlParser: true });
        mongoose.set('useCreateIndex', true);
    }

}

export default new App().app;
