import { handler as dbInit } from './index';
import { Request, Response } from 'express';
jest.mock('../health');
jest.mock('../../dal/import', () => ({
  importDbEntries: jest
    .fn()
    .mockResolvedValueOnce('{}')
    .mockResolvedValueOnce('{}')
    .mockRejectedValueOnce(new Error('I am Error.'))
}));

describe('image', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let dbClient;
  let searchClient;

  beforeAll(() => {
    searchClient = {
      insert: jest.fn().mockResolvedValue({})
    };
    dbClient = {
      connect: jest.fn().mockResolvedValue({}),
      getClaims: jest.fn().mockResolvedValue([]),
      insert: jest
        .fn()
        .mockResolvedValueOnce({ result: 'good' })
        .mockRejectedValue(new Error('insert failed')),
      close: jest.fn().mockResolvedValue({})
    };
    req = {};
    res = {
      header: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
      locals: {
        searchClient,
        dbClient
      }
    };
  });
});
