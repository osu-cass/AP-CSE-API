import e, { Request, Response, NextFunction, Application } from 'express';
import http from 'http';
import signale from 'signale';
import bodyParser from 'body-parser';
import { router } from '../routes';
import { DbClient } from '../dal/interface/index';
import { Tracer, Span, Tags } from 'opentracing';
import { createTracer } from '../utils/tracer';

/**
 * ServerContext defines a type for the tracer and db client
 * context for the App
 */
export interface ServerContext {
    dbClient: DbClient;
    tracer: Tracer;
}

/**
 * Response context gives each request handler access to it's
 * tracing span
 */
export interface ResponseContext extends ServerContext {
    span: Span;
}

/**
 * CSEResponse adds a type for our response context
 */
export interface CSEResponse extends Response {
    locals: ResponseContext;
}

/**
 * Encapsulates the server configuration and routes logic.
 */
export class Server {
    private client: DbClient;
    private app: Application;
    private port: string | number;
    private context: ServerContext;

    constructor() {
        this.app = e();
        this.port = process.env.PORT as string || 3000 as number;
        this.configure();
        this.registerMiddleware();
        this.routes();
        this.client = new DbClient({
            url: 'mongodb://mongo',
            port: 27017,
            dbName: 'cse'
        });
        this.context = {
            tracer: createTracer(),
            dbClient: this.client
        };
    }

    // public middleware = (req: Request, res: CSEResponse, next: NextFunction) => {
    //     const span: Span = this.context.tracer.startSpan('request');
    //     span.setTag(Tags.SAMPLING_PRIORITY, 1);
    //     span.tracer().startSpan('request');
    //     res.locals = { span, ...this.context };
    //     next();
    //     span.finish();
    // }

    public registerMiddleware(): void {
        this.app.use((req: Request, res: CSEResponse, next: NextFunction) => {
            const span: Span = this.context.tracer.startSpan('cse-api');
            span.setTag(Tags.SAMPLING_PRIORITY, 1);
            span.tracer().startSpan('/api');
            res.locals = { span, ...this.context };
            next();
            span.finish();
        });
    }

    public routes(): void {
        this.app.use('/api', router);
    }

    public configure(): void {
        this.app.use(bodyParser.json());
    }

    public start(): http.Server {
        signale.pending('Starting server...');

        return this.app.listen(this.port, () => {
            signale.success(`Server ready!`);
            signale.info(`Listening at http://localhost:${this.port}`);
          });
    }
}