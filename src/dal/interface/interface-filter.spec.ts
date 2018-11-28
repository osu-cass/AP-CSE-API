import { DbClient, IDbClientOptions } from '.';
import { IGradeAndSubjectResult, IFilterOptions } from '../../models/filter';
import { MongoClient } from 'mongodb';

describe('MongoDb client interface', () => {
  // tslint:disable:no-any
  let dbReturnValues0: any[];
  let dbReturnValues1: any[];
  let dbReturnValues2: any[];
  // tslint:enable:no-any
  let filterOptions: IFilterOptions;
  let collection: jest.Mock;
  let db: jest.Mock;
  let close: jest.Mock;
  let connect: jest.Mock;
  let find: jest.Mock;
  let toArray: jest.Mock;
  let aggregate: jest.Mock;

  beforeAll(() => {
    dbReturnValues0 = [
      {
        subject: ['math'],
        grades: [['3'], ['3'], ['5']]
      }
    ];

    dbReturnValues1 = [{ claimNumber: 'C1' }, { claimNumber: 'C2' }, { claimNumber: 'C2' }];

    dbReturnValues2 = [
      { target: [{ shortCode: 'MF.G3.C2.GG' }] },
      { target: [{ shortCode: 'FM.G3.C2.FG' }, { shortCode: 'MF.G4.C2.GG' }] }
    ];

    toArray = jest
      .fn()
      .mockResolvedValueOnce(dbReturnValues0)
      .mockRejectedValueOnce(new Error('db error'))
      .mockResolvedValueOnce(dbReturnValues1)
      .mockRejectedValueOnce(new Error('db error'))
      .mockResolvedValueOnce(dbReturnValues2)
      .mockRejectedValueOnce(new Error('db error'));

    find = jest.fn().mockImplementation(() => ({ toArray }));

    aggregate = jest.fn().mockImplementation(() => ({ toArray }));

    collection = jest.fn().mockImplementation(() => ({ find, aggregate, toArray }));

    db = jest.fn().mockImplementation(() => ({ collection }));

    close = jest.fn();

    connect = jest
      .fn()
      .mockResolvedValueOnce({
        db,
        close
      })
      .mockResolvedValueOnce({
        close,
        db: jest.fn()
      })
      .mockResolvedValueOnce({
        db,
        close
      })
      .mockResolvedValueOnce({
        close,
        db: jest.fn()
      })
      .mockResolvedValueOnce({
        db,
        close
      })
      .mockResolvedValueOnce({
        close,
        db: jest.fn()
      });

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

      beforeAll(() => {
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
              label: 'Grade 3'
            },
            {
              code: '5',
              label: 'Grade 5'
            },
            {
              code: '9,10,11,12',
              label: 'High School'
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

      afterEach(() => {
        db.mockClear();
        close.mockClear();
        connect.mockClear();
      });

      it('getSubjectsAndGrades() succeeds', async () => {
        expect.assertions(1);
        await client.connect();
        expect(await client.getSubjectsAndGrades()).toEqual(filterOptions);
      });

      it('getSubjectsAndGrades() fails', async () => {
        expect.assertions(1);
        try {
          await client.getSubjectsAndGrades();
        } catch (error) {
          expect(error).toEqual(new Error('failed to get subjects and grades'));
        }
      });

      it('getSubjectsAndGrades() fails with undefined db', async () => {
        expect.assertions(1);
        try {
          await client.connect();
          await client.getSubjectsAndGrades();
        } catch (error) {
          expect(error).toEqual(new Error('db is not defined'));
        }
      });
    });

    describe('get claimNumbers by subject and grade', () => {
      let client: DbClient;
      let dbInitArgs: IDbClientOptions;
      let subject: string;
      let grades: string;

      beforeAll(() => {
        filterOptions = {
          claimNumbers: [
            {
              code: 'C1',
              label: 'C1'
            },
            {
              code: 'C2',
              label: 'C2'
            }
          ]
        };

        dbInitArgs = {
          url: 'http://mongodb',
          port: 27017,
          dbName: 'test-db'
        };

        client = new DbClient(dbInitArgs);

        subject = 'Math';
        grades = '3';
      });

      afterEach(() => {
        db.mockClear();
        close.mockClear();
        connect.mockClear();
      });

      it('getClaimNumbers() succeeds', async () => {
        expect.assertions(1);
        await client.connect();
        expect(await client.getClaimNumbers(grades, subject)).toEqual(filterOptions);
      });

      it('getClaimNumbers() fails', async () => {
        expect.assertions(1);
        try {
          await client.getClaimNumbers(grades, subject);
        } catch (error) {
          expect(error).toEqual(new Error('failed to get claim numbers'));
        }
      });

      it('getClaimNumbers() fails with undefined db', async () => {
        expect.assertions(1);
        try {
          await client.connect();
          await client.getClaimNumbers(grades, subject);
        } catch (error) {
          expect(error).toEqual(new Error('db is not defined'));
        }
      });
    });

    describe('get targetShortCode subject, grade and claimNumber', () => {
      let client: DbClient;
      let dbInitArgs: IDbClientOptions;
      let subjects: string;
      let grades: string;
      let claimNumber: string;

      beforeAll(() => {
        filterOptions = {
          targetShortCodes: [
            {
              code: 'MF.G3.C2.GG',
              label: 'MF.G3.C2.GG'
            },
            {
              code: 'FM.G3.C2.FG',
              label: 'FM.G3.C2.FG'
            }
          ]
        };

        dbInitArgs = {
          url: 'http://mongodb',
          port: 27017,
          dbName: 'test-db'
        };

        client = new DbClient(dbInitArgs);

        subjects = 'Math';
        grades = '3';
        claimNumber = 'C2';
      });

      it('getTargetShortCodes() succeeds', async () => {
        expect.assertions(1);
        await client.connect();
        expect(await client.getTargetShortCodes(grades, subjects, claimNumber)).toEqual(
          filterOptions
        );
      });

      it('getTargetShortCodes() fails', async () => {
        expect.assertions(1);
        try {
          await client.getTargetShortCodes(grades, subjects, claimNumber);
        } catch (error) {
          expect(error).toEqual(new Error('failed to get target short codes'));
        }
      });

      it('getTargetShortCodes() fails with undefined db', async () => {
        expect.assertions(1);
        try {
          await client.connect();
          await client.getTargetShortCodes(grades, subjects, claimNumber);
        } catch (error) {
          expect(error).toEqual(new Error('db is not defined'));
        }
      });
    });
  });
});
