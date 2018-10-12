import { handler as search } from './';
import { Request, Response } from 'express';

jest.mock('../health', () => ({
  setRouteHealth: jest.fn().mockResolvedValue('{}'),
  Health: jest.fn().mockImplementation(() => {
    enum Health {
      good = 'OK',
      bad = 'This resource is either not running or not working. Better fix it.',
      busy = 'This resource is busy, please try again later.'
    }
  })
}));

describe('search', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(() => {
    req = {};
    res = {
      send: jest.fn()
    };
  });

  it('handles search request', () => {
    search(<Request>req, <Response>res);
    expect(res.send).toHaveBeenCalledWith('search endpoint');
  });
});
