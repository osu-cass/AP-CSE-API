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
  let searchClient;

  beforeAll(() => {
    searchClient = {
      search: jest
        .fn()
        .mockResolvedValueOnce({ result: 'good' })
        .mockRejectedValueOnce(new Error('error'))
    };
    req = {
      params: {
        query: 'query'
      }
    };
    res = {
      status: jest.fn(),
      send: jest.fn(),
      locals: { searchClient }
    };
  });

  it('handles search request', async () => {
    await search(<Request>req, <Response>res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: 'good' });
  });

  it('handles search error', async () => {
    await search(<Request>req, <Response>res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(new Error('error'));
  });
});
