import { handler as healthCheck, Health } from '.';
import { Request, Response } from 'express';

describe('API Routing Health Check', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(() => {
    res = {
      sendStatus: jest.fn(),
      locals: {
        searchClient: {
          ping: jest
            .fn()
            .mockResolvedValueOnce(Health.good)
            .mockResolvedValueOnce(Health.good)
            .mockRejectedValueOnce(Health.good)
        },
        dbClient: {
          ping: jest
            .fn()
            .mockResolvedValueOnce(Health.good)
            .mockResolvedValueOnce(Health.busy)
            .mockRejectedValueOnce(Health.good)
        }
      }
    };
    req = {};
  });

  it('returns ready', async () => {
    expect.assertions(1);
    await healthCheck(<Request>req, <Response>res);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it('returns accepted (202) but not ready', async () => {
    expect.assertions(1);
    await healthCheck(<Request>req, <Response>res);
    expect(res.sendStatus).toHaveBeenCalledWith(202);
  });

  it('returns error', async () => {
    expect.assertions(1);
    await healthCheck(<Request>req, <Response>res);
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
