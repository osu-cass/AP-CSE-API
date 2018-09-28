import { handler as search } from './';
import { Request, Response } from 'express';

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
