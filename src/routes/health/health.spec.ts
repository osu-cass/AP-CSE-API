import { handler as healthCheck, Health, setRouteHealth } from '.';
import { Request, Response } from 'express';

describe('API Routing Health Check', () => {
  it('sets route health', () => {
    const status: Health = Health.busy;
    const req: Partial<Request> = {};
    req.path = '/init';
    setRouteHealth(status, <Request>req);
  });
  it('returns a response', () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      send: jest.fn()
    };

    healthCheck(<Request>req, <Response>res);

    expect(res.send).toBeCalledTimes(1);
  });
});
