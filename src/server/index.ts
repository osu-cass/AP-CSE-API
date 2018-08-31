import express from 'express';
import morgan from 'morgan';
import http from 'http';
import signale from 'signale';
import passport from 'passport';
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import { authorize } from '../passport';
import { router } from '../routes';

export class Server {
    private app: express.Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT as string || 3000 as number;
        this.configure();
        this.routes();
    }

    public routes(): void {
        this.app.use('/', router);
    }

    public configure(): void {
        passport.use(new LocalStrategy(authorize));
        this.app.use(bodyParser.json());
        this.app.use(morgan(process.env.NODE_ENV === 'production' ? 'short' : 'dev'));
        this.app.use(passport.initialize());
    }

    public start(): http.Server {
        signale.pending('Starting server...');

        return this.app.listen(this.port, () => {
            signale.success(`Server ready!`);
            signale.info(`Listening at http://localhost:${this.port}`);
          });
    }
}