import { handler as dbInit } from './index';
import { Request, Response } from 'express';

jest.mock('express');
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
  beforeAll(() => {
    dbClient = {
      connect: jest.fn().mockResolvedValue({}),
      insert: jest
        .fn()
        .mockResolvedValueOnce({ result: 'good' })
        .mockResolvedValue(undefined)
    };
    req = {};
    res = {
      header: jest.fn(),
      send: jest.fn(),
      locals: {
        dbClient
      }
    };
  });

  it('initializes the database with data', async () => {
    expect.assertions(1);
    await dbInit(<Request>req, <Response>res);
    expect(res.send).toBeCalledWith('good');
  });

  it('fails to init database', async () => {
    expect.assertions(1);
    await dbInit(<Request>req, <Response>res);
    expect(res.send).toBeCalledWith('Nope');
  });
  it('throws an error', async () => {
    try {
      await dbInit(<Request>req, <Response>res);
    } catch (err) {
      expect(err).toEqual(new Error('I am Error.'));
    }
  });
});
