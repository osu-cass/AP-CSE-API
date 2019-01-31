import e, { NextFunction, Request, Response } from 'express';
import { use, listen } from '../__mocks__/express';
import { Server, CSEResponse } from './';
import { Health } from '../routes/health/index';
import { InsertWriteOpResult } from 'mongodb';

jest.mock('../utils/tracer', () => ({
  createTracer: jest.fn().mockImplementation(() => ({
    startSpan: jest.fn().mockImplementation(() => ({
      setTag: jest.fn(),
      log: jest.fn(),
      tracer: jest.fn().mockImplementation(() => ({
        startSpan: jest.fn()
      })),
      finish: jest.fn()
    }))
  })),
  applyTracing: jest
    .fn()
    .mockImplementation(() => (request: Request, response: CSEResponse, next?: NextFunction) =>
      jest.fn()
    )
}));

jest.mock('../dal/import');
jest.mock('../utils/logger');

jest.mock('../dal/search', () => ({
  SearchClient: jest.fn().mockImplementation(() => ({
    ping: jest.fn().mockResolvedValue(Health.good),
    insertDocuments: jest.fn().mockResolvedValue({})
  }))
}));

jest.mock('../dal/interface', () => ({
  DbClient: jest
    .fn()
    .mockImplementationOnce(() => ({
      ping: jest.fn().mockResolvedValueOnce(Health.good),
      connect: jest.fn().mockResolvedValueOnce({}),
      close: jest.fn().mockResolvedValueOnce({}),
      exists: jest.fn().mockResolvedValueOnce({})
    }))
    .mockImplementationOnce(() => ({
      ping: jest
        .fn()
        .mockRejectedValueOnce(new Error('error'))
        .mockResolvedValueOnce(Health.good),
      connect: jest.fn().mockResolvedValueOnce({}),
      close: jest.fn().mockResolvedValueOnce({}),
      exists: jest.fn().mockResolvedValueOnce({})
    }))
    .mockImplementationOnce(() => ({
      ping: jest.fn().mockResolvedValueOnce(Health.good),
      connect: jest.fn().mockRejectedValueOnce(new Error('error')),
      close: jest.fn().mockResolvedValueOnce({}),
      exists: jest.fn().mockResolvedValueOnce({})
    }))
}));

describe('Server', () => {
  const OLD_ENV = process.env;
  let server: Server;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  const routesSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'routes');
  const configureSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'configure');
  const registerMiddlewareSpy: jest.SpyInstance = jest.spyOn(
    Server.prototype,
    'registerMiddleware'
  );
  const gracefulStartSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'gracefulStart');
  const initDataStoreSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'initializeDataStore');

  beforeAll(() => {
    server = new Server();
    next = jest.fn();
    req = {};
    res = {
      locals: {},
      header: jest.fn()
    };
    process.env = { ...OLD_ENV };
    delete process.env.SERVERINIT;
  });

  afterEach(() => {
    use.mockClear();
    listen.mockClear();
    gracefulStartSpy.mockClear();
    initDataStoreSpy.mockClear();
    process.env = OLD_ENV;
  });

  it('initializes correctly', () => {
    expect.assertions(4);
    expect(routesSpy).toHaveBeenCalledTimes(1);
    expect(configureSpy).toHaveBeenCalledTimes(1);
    expect(registerMiddlewareSpy).toHaveBeenCalledTimes(1);
    expect(use).toHaveBeenCalledTimes(5);
  });

  it('gracefully starts server successfully', async () => {
    expect.assertions(3);
    await server.start();
    expect(gracefulStartSpy).toHaveBeenCalledTimes(1);
    expect(e).toHaveBeenCalledTimes(1);
    expect(listen).toHaveBeenCalledTimes(1);
  });

  it('gracefully starts server successfully on successive attempts', async () => {
    expect.assertions(4);
    await server.start();
    expect(gracefulStartSpy).toHaveBeenCalledTimes(1);
    expect(initDataStoreSpy).toHaveBeenCalledTimes(1);
    expect(e).toHaveBeenCalledTimes(1);
    expect(listen).toHaveBeenCalledTimes(1);
  });

  it('it configures the server', () => {
    server.configure();
    expect.assertions(1);
    expect(use).toHaveBeenCalledTimes(2);
  });

  it('calls middleware', () => {
    use.mockReset();
    // tslint:disable-next-line: no-unsafe-any
    use.mockImplementation(func => func(req, res, next));
    server.registerMiddleware();
    expect.assertions(1);
    expect(use).toHaveBeenCalledTimes(1);
  });
});
