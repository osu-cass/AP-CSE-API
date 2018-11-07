import e, { NextFunction, Request, Response } from 'express';
import { use, listen } from '../__mocks__/express';
import { Server, CSEResponse } from './';

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

describe('Server', () => {
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

  beforeAll(() => {
    server = new Server();
    next = jest.fn();
    req = {};
    res = {
      locals: {},
      header: jest.fn()
    };
  });

  afterEach(() => {
    use.mockClear();
  });

  it('initializes correctly', () => {
    expect.assertions(4);
    expect(routesSpy).toHaveBeenCalledTimes(1);
    expect(configureSpy).toHaveBeenCalledTimes(1);
    expect(registerMiddlewareSpy).toHaveBeenCalledTimes(1);
    expect(use).toHaveBeenCalledTimes(4);
  });

  it('returns an http.Server instance', async () => {
    expect.assertions(2);
    await server.start();
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
