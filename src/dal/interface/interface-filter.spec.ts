import { DbClient, IDbClientOptions } from '.';
import { IGradeAndSubjectResult, IFilterOptions } from '../../models/filter';
import { MongoClient } from 'mongodb';

describe('MongoDb client interface', () => {
  let dbReturnValues: IGradeAndSubjectResult;
  let collection: jest.Mock;
  let db: jest.Mock;
  let close: jest.Mock;
  let connect: jest.Mock;

  beforeAll(() => {
    collection = jest.fn().mockImplementation(() => ({
      toArray: jest
        .fn()
        .mockResolvedValueOnce(dbReturnValues)
        .mockRejectedValueOnce(new Error('db error'))
    }));

    db = jest.fn().mockImplementation(() => ({ collection }));

    close = jest.fn();

    connect = jest
      .fn()
      .mockResolvedValueOnce({
        db,
        close
      })
      .mockRejectedValueOnce(new Error('connect failed'));

    jest.mock('mongodb', () => ({
      MongoClient: {
        db,
        connect,
        close
      }
    }));

    MongoClient.connect = connect;
  });

  describe('generate values for filter', () => {
    describe('get all unique subjects and grades', () => {
      let client: DbClient;
      let dbInitArgs: IDbClientOptions;
      let filterOptions: IFilterOptions;

      beforeAll(() => {
        dbReturnValues = {
          subject: ['math'],
          grades: [['3']]
        };
        filterOptions = {
          subject: [
            {
              code: 'math',
              label: 'math'
            }
          ],
          grades: [
            {
              code: '3',
              label: '3'
            }
          ]
        };

        dbInitArgs = {
          url: 'http://mongodb',
          port: 27017,
          dbName: 'test-db'
        };
        client = new DbClient(dbInitArgs);
      });

      it('getClaimNumbers succeeds', async () => {
        expect.assertions(1);
        await client.connect();
        expect(await client.getSubjectsAndGrades()).toEqual(filterOptions);
      });

      it('getClaimNumbers fails', async () => {
        expect.assertions(1);
        try {
          await client.connect();
          await client.getSubjectsAndGrades();
        } catch (error) {
          expect(error).toEqual(new Error('db error'));
        }
      });

      it('getClaimNumbers fails with undefined db', async () => {
        expect.assertions(0);
      });
    });

    describe('get claimNumber by subject and grade', () => {
      let client: DbClient;
      let dbInitArgs: IDbClientOptions;

      beforeAll(() => {
        dbInitArgs = {
          url: 'http://mongodb',
          port: 27017,
          dbName: 'test-db'
        };
        client = new DbClient(dbInitArgs);
      });

      it('getClaimNumbers succeeds', async () => {
        expect.assertions(0);
      });

      it('getClaimNumbers fails', async () => {
        expect.assertions(0);
      });

      it('getClaimNumbers fails with undefined db', async () => {
        expect.assertions(0);
      });
    });

    describe('get targetShortCode subject, grade and claimNumber', () => {
      let client: DbClient;
      let dbInitArgs: IDbClientOptions;
      beforeAll(() => {
        dbInitArgs = {
          url: 'http://mongodb',
          port: 27017,
          dbName: 'test-db'
        };
        client = new DbClient(dbInitArgs);
      });

      it('getClaimNumbers succeeds', async () => {
        expect.assertions(0);
      });

      it('getClaimNumbers fails', async () => {
        expect.assertions(0);
      });

      it('getClaimNumbers fails with undefined db', async () => {
        expect.assertions(0);
      });
    });
  });
});
