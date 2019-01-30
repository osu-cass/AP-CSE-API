import e, { Request, Response, NextFunction, Application } from 'express';
import http, { RequestOptions } from 'http';
import signale from 'signale';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { Tracer, Span, Tags } from 'opentracing';
import { Logger } from 'winston';
import { router } from '../routes';
import { DbClient } from '../dal/interface';
import { SearchClient } from '../dal/search';
import { createTracer } from '../utils/tracer';
import { logger, LoggingStream } from '../utils/logger';
import { Health, healthCheck } from '../routes/health';
import { importDbEntries } from '../dal/import';
import { IClaim } from '../models/claim';
import proxy from 'express-http-proxy';

/**
 * ServerContext defines a type for the tracer and db client
 * context for the App
 */
export interface ServerContext {
  dbClient: DbClient;
  searchClient: SearchClient;
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

export interface IServer {
  registerMiddleware(): void;
  routes(): void;
  configure(): void;
  start(): Promise<http.Server>;
}

/**
 * Encapsulates the server configuration and routes logic.
 */
export class Server implements IServer {
  private app: Application;
  private port: string | number;
  private context: ServerContext;

  constructor() {
    const {
      PORT: port = 3000,
      ELASTICSEARCH_HOSTNAME: esHost = 'elasticsearch',
      ELASTICSEARCH_PORT: esPort = '9200',
      MONGO_HOSTNAME: mongoHost = 'mongo',
      MONGO_PORT: mongoPort = '21017',
      MONGO_DB_NAME: dbName = 'cse'
    } = process.env;

    this.app = e();
    this.port = port;
    this.configure();
    this.registerMiddleware();
    this.routes();
    this.context = {
      logger,
      tracer: createTracer(),
      searchClient: new SearchClient({
        host: `${esHost}:${esPort}`
      }),
      dbClient: new DbClient({
        dbName,
        url: `mongodb://${mongoHost}`,
        port: parseInt(mongoPort, 10)
      })
    };
    router.stack.forEach(endpoint => {
      // tslint:disable-next-line: no-any no-unsafe-any
      endpoint.routeHealth = Health.good;
    });
  }

  public registerMiddleware(): void {
    this.app.use((req: Request, res: CSEResponse, next: NextFunction) => {
      const span: Span = this.context.tracer.startSpan('/api');
      span.setTag(Tags.SAMPLING_PRIORITY, 1);
      span.tracer().startSpan('/api');
      res.locals = { span, ...this.context };
      next();
      span.finish();
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    });
  }

  public routes(): void {
    this.app.use('/api', router);
    this.app.get('/health', healthCheck);
    this.app.use('/proxy', proxy('https://images.smarterbalanced.org', {proxyReqOptDecorator: (proxyReqOpts: RequestOptions, srcReq: Request) => {
        // tslint:disable:no-non-null-assertion
        proxyReqOpts.headers!['Access-Control-Allow-Origin'] = '*';

        return proxyReqOpts;
    }
  }));
  }

  public configure(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('combined', { stream: new LoggingStream() }));
  }

  public async gracefulStart(): Promise<void> {
    const { searchClient, dbClient, logger } = this.context;

    let mongoRunning: Health = Health.bad;
    let esRunning: Health = Health.bad;

    while (
      esRunning !== Health.good &&
      esRunning !== Health.busy &&
      mongoRunning !== Health.good &&
      mongoRunning !== Health.busy
    ) {
      try {
        logger.info('Checking server runtime dependecies...');
        signale.pending('Checking server runtime dependecies...');
        mongoRunning = await dbClient.ping();
        esRunning = await searchClient.ping();
      } catch (err) {
        // tslint:disable:no-unsafe-any
        logger.error('Server runtime dependency health-check failed', err);
        signale.error('Server runtime dependency health-check failed', err);
        throw new Error(err);
        // tslint:enable:no-unsafe-any
      }
    }
  }

  public async initializeDataStore() {
    const { dbClient, searchClient, logger } = this.context;
    const { SERVERINIT: serverInit = 'no' } = process.env;

    try {
      if (serverInit === 'yes' && !(await dbClient.exists())) {
        logger.info('initializing data store');
        const claims: IClaim[] = await importDbEntries();
        await dbClient.connect();
        await dbClient.insert(claims);
        await searchClient.insert(await dbClient.getClaims());
        logger.info('data store init succeeded');
      }
    } catch (err) {
      // tslint:disable:no-unsafe-any
      logger.error(err);
      throw new Error(err);
      // tslint:enable:no-unsafe-any
    } finally {
      await dbClient.close();
    }
  }

  public async start(): Promise<http.Server> {
    try {
      signale.pending('Starting server...');
      await this.gracefulStart();
      await this.initializeDataStore();
    } catch (err) {
      // tslint:disable:no-unsafe-any
      logger.error(err);
      throw new Error(err);
      // tslint:enable:no-unsafe-any
    }

    return this.app.listen(this.port, async () => {
      signale.success(`Server ready!`);
      signale.info(`Listening at http://localhost:${this.port}`);
    });
  }
}
