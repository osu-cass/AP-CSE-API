import { handler as target } from '.';
import { Request, Response } from 'express';
jest.mock('../health');

describe('target', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let dbClient;
  let result: object;

  beforeAll(() => {
    result = { test: 'passed' };
    req = {
      params: {
        subject: 'Math',
        grade: [5, 6],
        claim: 'C2',
        targets: 'EGD.TTD.T6.O7'
      }
    };
    dbClient = {
      connect: jest.fn().mockResolvedValue({}),
      close: jest.fn(),
      getTarget: jest
        .fn()
        .mockResolvedValueOnce(result)
        .mockRejectedValueOnce(new Error('error'))
    };
    res = {
      send: jest.fn(),
      status: jest.fn(),
      locals: { dbClient }
    };
  });

  it('handles request for target', async () => {
    await target(<Request>req, <Response>res);
    expect.assertions(1);
    expect(res.send).toHaveBeenCalledWith(result);
  });

  it('handles error during a request', async () => {
    await target(<Request>req, <Response>res);
    expect.assertions(1);
    expect(res.send).toHaveBeenCalledWith(new Error('error'));
  });
});
