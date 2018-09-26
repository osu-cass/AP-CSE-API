import e, { Request, Response, NextFunction, Application, RequestHandler } from 'express';
import http from 'http';
import signale from 'signale';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { router } from '../routes';
import { DbClient } from '../dal/interface/index';
import { Tracer, Span, Tags } from 'opentracing';
import { createTracer } from '../utils/tracer';
import { logger, LoggingStream } from '../utils/logger';
import { Logger } from 'winston';

/**
 * ServerContext defines a type for the tracer and db client
 * context for the App
 */
export interface ServerContext {
  dbClient: DbClient;
  tracer: Tracer;
  logger: Logger;
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
  private app: Application;
  private port: string | number;
  private context: ServerContext;

  constructor() {
    this.app = e();
    this.port = (process.env.PORT as string) || (3000 as number);
    this.configure();
    this.registerMiddleware();
    this.routes();
    this.context = {
      logger,
      tracer: createTracer(),
      dbClient: new DbClient({
        url: 'mongodb://mongo',
        port: 27017,
        dbName: 'cse'
      })
    };
  }

  public registerMiddleware(): void {
    this.app.use((req: Request, res: CSEResponse, next: NextFunction) => {
      const span: Span = this.context.tracer.startSpan('/api');
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
    this.app.use(morgan('combined', { stream: new LoggingStream() }));
  }

  public start(): http.Server {
    signale.pending('Starting server...');

    return this.app.listen(this.port, () => {
      signale.success(`Server ready!`);
      signale.info(`Listening at http://localhost:${this.port}`);
    });
  }
}
