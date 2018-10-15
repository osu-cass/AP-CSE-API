import { handler as target } from './index';
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
