import { handler as dbInit } from './index';
import { Request, Response } from 'express';

jest.mock('express');

jest.mock('../../dal/interface', () => {
  return {
    DbClient: jest
      .fn()
      .mockImplementationOnce(() => ({
        connect: jest.fn().mockResolvedValue({}),
        insert: jest.fn().mockResolvedValue({ result: 'good' }),
        close: jest.fn().mockResolvedValue({}),
        getClaims: jest.fn().mockResolvedValue({})
      }))
      .mockImplementationOnce(() => ({
        connect: jest.fn().mockResolvedValue({}),
        insert: jest.fn().mockRejectedValue(undefined),
        close: jest.fn().mockResolvedValue({})
      }))
  };
});

describe('init', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockSearchClient;

  beforeAll(() => {
    mockSearchClient = {
      insertDocuments: jest.fn().mockResolvedValue({})
    };
    req = {};
    res = {
      header: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
      locals: {
        searchClient: mockSearchClient
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
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith('insert failed');
  });
});
