import { handler as filter } from './';
import { Request, Response } from 'express';
import { IFilterOptions } from '../../models/filter';

describe('API Filter endpoint', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let filterOptions: IFilterOptions;
  let dbClient;

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
        getClaims: jest.fn().mockResolvedValue([]),
        getSubjectsAndGrades: jest
          .fn()
          .mockResolvedValueOnce(filterOptions)
          .mockRejectedValueOnce(new Error('err'))
      };
      req = {
        query: {}
      };
      res = {
        status: jest.fn(),
        send: jest.fn(),
        locals: { dbClient }
      };
    });

    it('with no params', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(filterOptions);
    });

    it('error with no params', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(new Error('err'));
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
          .mockRejectedValueOnce(new Error('err'))
      };
      req = {
        query: {
          grades: '3',
          subject: 'Math'
        }
      };
      res = {
        status: jest.fn(),
        send: jest.fn(),
        locals: { dbClient }
      };
    });

    it('with grade and subject', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(filterOptions);
    });

    it('error with grade and subject', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(new Error('err'));
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
          .mockRejectedValueOnce(new Error('err'))
      };
      req = {
        query: {
          grades: '3',
          subject: 'Math',
          claimNumber: 'M.G3.C2.TA'
        }
      };
      res = {
        status: jest.fn(),
        send: jest.fn(),
        locals: { dbClient }
      };
    });

    it('with grade, subject, claimNumber', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(filterOptions);
    });

    it('error with grade, subject, claimNumber', async () => {
      expect.assertions(2);
      await filter(<Request>req, <Response>res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(new Error('err'));
    });
  });
});
