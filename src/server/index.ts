import express from 'express';
import morgan from 'morgan';
import http from 'http';
import signale from 'signale';
import passport from 'passport';
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import { authorize } from '../passport';
import { home, greet, dbInit, search, filter } from '../routes';
import { DbClient } from '../dal/interface/index';

export class Server {
    private client: DbClient;
    private app: express.Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT as string || 3000 as number;
        this.configure();
        this.routes();
        this.client = new DbClient({
            url: 'mongodb://mongo',
            port: 27017,
            dbName: 'admin'
        });
    }


    public routes(): void {
        this.app.get('/', home);
        this.app.get('/search', search);
        this.app.get('/filter', filter);
        this.app.post('/greet', greet);
        this.app.post('/init', dbInit);
    }

    public configure(): void {
        // passport.use(new LocalStrategy(authorize));
        this.app.use(bodyParser.json());
        this.app.use(morgan(process.env.NODE_ENV === 'production' ? 'short' : 'dev'));
        // this.app.use(passport.initialize());
        this.app.locals = {
            dbClient: this.client
        };
    }

    public start(): http.Server {
        signale.pending('Starting server...');

        return this.app.listen(this.port, () => {
            signale.success(`Server ready!`);
            signale.info(`Listening at http://localhost:${this.port}`);
          });
    }
}