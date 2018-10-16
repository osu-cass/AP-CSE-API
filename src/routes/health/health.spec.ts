import { handler as healthCheck, Health, setRouteHealth } from '.';
import { Request, Response } from 'express';
import { router } from '../index';

describe('API Routing Health Check', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let status: Health;

  beforeAll(() => {
    res = {
      send: jest.fn(),
      status: jest.fn()
    };
    req = {};
  });

  it('sets route health', () => {
    status = Health.busy;
    req.path = '/init';
    setRouteHealth(status, <Request>req);
    let result;
    // tslint:disable: no-any no-unsafe-any
    router.stack.forEach(endpoint => {
      if (endpoint.route.path === req.path) {
        result = endpoint.routeHealth;
        // tslint:enable: no-any no-unsafe-any
      }
    });
    expect(result).toBe(Health.busy);
  });

  it('returns a response', () => {
    healthCheck(<Request>req, <Response>res);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect.assertions(2);
  });
});
