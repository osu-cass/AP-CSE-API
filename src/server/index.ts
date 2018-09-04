import e from 'express';
import morgan from 'morgan';
import http from 'http';
import signale from 'signale';
import passport from 'passport';
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import { authorize } from '../passport';
import { home, greet, dbInit } from '../routes';

/**
 * This class encapsulates the server and it's configuration.
 */
export class Server {
    private app: e.Application;
    private port: string | number;

    constructor() {
        this.app = e();
        this.port = process.env.PORT as string || 3000 as number;
        this.configure();
        this.routes();
    }

    public routes(): void {
        this.app.get('/', home);
        this.app.post('/greet', greet);
        this.app.post('/init', dbInit);
    }

    public configure(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan(process.env.NODE_ENV === 'production' ? 'short' : 'dev'));
    }

    public start(): http.Server {
        signale.pending('Starting server...');

        return this.app.listen(this.port, () => {
            signale.success(`Server ready!`);
            signale.info(`Listening at http://localhost:${this.port}`);
          });
    }
}