import { handler as filter } from './';
import { Request, Response } from 'express';
import { IFilterOptions } from '../../models/filter';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

describe('API Filter endpoint', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let filterOptions: IFilterOptions;
  let dbClient;
  let status: jest.Mock;
  let sendStatus: jest.Mock;
  let send: jest.Mock;

  describe('initial request', () => {
    beforeAll(() => {
      filterOptions = {
        subject: [
          {
            code: 'Math',
            label: 'Math'
          }
        ],
        grades: [
          {
            code: '3',
            label: '3'
          }
        ]
      };

      dbClient = {
        connect: jest.fn().mockResolvedValue({}),
        close: jest.fn(),
        getSubjectsAndGrades: jest
          .fn()
          .mockResolvedValueOnce(filterOptions)
          .mockResolvedValueOnce(undefined)
          .mockRejectedValueOnce(new Error('err')),
        getClaimNumbers: jest
          .fn()
          .mockResolvedValueOnce(filterOptions)
          .mockResolvedValueOnce(undefined)
          .mockRejectedValueOnce(new Error('err')),
        getTargetShortCodes: jest
          .fn()
          .mockResolvedValueOnce(filterOptions)
          .mockResolvedValueOnce(undefined)
          .mockRejectedValueOnce(new Error('err'))
      };

      status = jest.fn();
      send = jest.fn();
      sendStatus = jest.fn();

      req = {
        query: {}
      };
      res = {
        status,
        send,
        sendStatus,
        locals: { dbClient }
      };
    });

    afterEach(() => {
      status.mockClear();
      send.mockClear();
    });

    it('with no params', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith(filterOptions);
    });

    it('returns request error on bad request', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(sendStatus).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith(undefined);
    });

    it('error with no params', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(sendStatus).toHaveBeenCalledWith(500);
      expect(send).toHaveBeenCalledWith(undefined);
    });
  });

  describe('secondary request', () => {
    beforeAll(() => {
      filterOptions = {
        claimNumbers: [
          {
            code: 'C3',
            label: 'C3'
          }
        ]
      };
      dbClient = {
        connect: jest.fn().mockResolvedValue({}),
        close: jest.fn().mockResolvedValue({}),
        getClaimNumbers: jest
          .fn()
          .mockResolvedValueOnce(filterOptions)
          .mockResolvedValueOnce(undefined)
          .mockRejectedValueOnce(new Error('err'))
      };

      status = jest.fn();
      send = jest.fn();
      sendStatus = jest.fn();

      req = {
        query: {
          grades: '3',
          subject: 'Math'
        }
      };
      res = {
        status,
        send,
        sendStatus,
        locals: { dbClient }
      };
    });

    afterEach(() => {
      status.mockClear();
      send.mockClear();
    });

    it('with grade and subject', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith(filterOptions);
    });

    it('returns request error on bad request', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(sendStatus).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith(undefined);
    });

    it('error with grade and subject', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(sendStatus).toHaveBeenCalledWith(500);
      expect(send).toHaveBeenCalledWith(undefined);
    });
  });

  describe('third request', () => {
    beforeAll(() => {
      filterOptions = {
        targetShortCodes: [
          {
            code: 'M.G3.C2.TA',
            label: 'M.G3.C2.TA'
          }
        ]
      };
      dbClient = {
        connect: jest.fn().mockResolvedValue({}),
        close: jest.fn().mockResolvedValue({}),
        getTargetShortCodes: jest
          .fn()
          .mockResolvedValueOnce(filterOptions)
          .mockResolvedValueOnce(undefined)
          .mockRejectedValueOnce(new Error('err'))
      };

      status = jest.fn();
      send = jest.fn();
      sendStatus = jest.fn();

      req = {
        query: {
          grades: '3',
          subject: 'Math',
          claimNumber: 'M.G3.C2.TA'
        }
      };
      res = {
        status,
        send,
        sendStatus,
        locals: { dbClient }
      };
    });

    afterEach(() => {
      status.mockClear();
      send.mockClear();
    });

    it('with grade, subject, claimNumber', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith(filterOptions);
    });

    it('returns request error on bad request', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(sendStatus).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith(undefined);
    });

    it('error with grade, subject, claimNumber', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(sendStatus).toHaveBeenCalledWith(500);
      expect(send).toHaveBeenCalledWith(undefined);
    });
  });
});
