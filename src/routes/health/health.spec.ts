import { handler as healthCheck, Health, setRouteHealth } from '.';
import { Request, Response } from 'express';

describe('API Routing Health Check', () => {
  let req: Partial<Request> ;
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
  });

  it('returns a response', () => {
    healthCheck(<Request>req, <Response>res);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
