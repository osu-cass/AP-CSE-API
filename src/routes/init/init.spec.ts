import { handler as dbInit } from './index';
import { Request, Response } from 'express';
jest.mock('../health');
jest.mock('./db/index', () => ({
  importDbEntries: jest
    .fn()
    .mockResolvedValueOnce('{}')
    .mockResolvedValueOnce('{}')
    .mockRejectedValueOnce(new Error('I am Error.'))
}));

describe('init', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let dbClient;
  let searchClient;

  beforeAll(() => {
    searchClient = {
      insertDocuments: jest.fn().mockResolvedValue({})
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

  it('initializes the database with data', async () => {
    expect.assertions(2);
    await dbInit(<Request>req, <Response>res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith('good');
  });

  it('fails to init database', async () => {
    expect.assertions(2);
    await dbInit(<Request>req, <Response>res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith('insert failed');
  });

  it('throws an error', async () => {
    try {
      await dbInit(<Request>req, <Response>res);
    } catch (err) {
      expect(err).toEqual(new Error('I am Error.'));
    }
  });
});
