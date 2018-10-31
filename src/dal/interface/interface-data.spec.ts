import { DbClient, IDbClientOptions } from '.';
import { IClaim } from '../../models/claim';
import { ITargetParams } from '../../routes';
import { MongoClient } from 'mongodb';

/*
  This test suite is responsible for testing the methods in the DbClient class that
  inserts and retrieves data from the mongo db instance.
*/

describe('MongoDb client interface', () => {
  let client: DbClient;
  let dbInitArgs: IDbClientOptions;
  let testData: Partial<IClaim>[];
  let dropCollection: jest.Mock;
  let createCollection: jest.Mock;
  let findOne: jest.Mock;
  let find: jest.Mock;
  let collections: jest.Mock;
  let collection: jest.Mock;
  let db: jest.Mock;
  let close: jest.Mock;
  let connect: jest.Mock;

  beforeAll(() => {
    dropCollection = jest.fn();
    createCollection = jest.fn();

    findOne = jest
      .fn()
      .mockResolvedValueOnce({ target: [{ shortCode: '1234', test: 'passed' }] })
      .mockRejectedValueOnce(new Error('error'));

    find = jest
      .fn()
      .mockImplementationOnce(() => ({
        toArray: jest.fn().mockResolvedValue({ test: 'passed' })
      }))
      .mockImplementationOnce(() => ({
        toArray: jest.fn().mockRejectedValue(new Error('no result'))
      }));

    collections = jest
      .fn()
      .mockImplementationOnce(() => [{ collectionName: 'not-claims' }])
      .mockImplementationOnce(() => [{ collectionName: 'claims' }])
      .mockImplementationOnce(() => {
        throw new Error('contrived error');
      });

    collection = jest.fn().mockImplementation(() => ({
      find,
      findOne,
      insertMany: jest.fn().mockResolvedValue('success'),
      createIndex: jest.fn()
    }));

    db = jest.fn().mockImplementation(() => ({
      collection,
      collections,
      dropCollection,
      createCollection
    }));

    close = jest.fn().mockImplementation(() => ({ test: 'hi' }));

    connect = jest
      .fn()
      .mockResolvedValueOnce({ db, close })
      .mockResolvedValueOnce({ db, close })
      .mockResolvedValueOnce({ close, db: jest.fn() })
      .mockResolvedValueOnce({ db, close })
      .mockResolvedValueOnce({ close, db: jest.fn() });

    jest.mock('mongodb', () => ({
      MongoClient: {
        db,
        connect,
        close
      }
    }));

    MongoClient.connect = connect;
  });

  describe('data insertion', () => {
    beforeAll(() => {
      dbInitArgs = {
        url: 'http://mongodb',
        port: 27017,
        dbName: 'test-db'
      };
      client = new DbClient(dbInitArgs);
      testData = [{ title: 'text' }];
    });

    afterEach(() => {
      collection.mockClear();
      collections.mockClear();
      dropCollection.mockClear();
      createCollection.mockClear();
    });

    it('successfully inserts data into mongodb', async () => {
      await client.connect();
      const result = await client.insert(<IClaim[]>testData);
      expect.assertions(5);
      expect(result).toEqual('success');
      expect(collections).toHaveBeenCalledTimes(1);
      expect(dropCollection).toHaveBeenCalledTimes(0);
      expect(createCollection).toHaveBeenCalledWith('claims');
      expect(collection).toHaveBeenCalledWith('claims');
    });

    it('successfully replaces data in mongodb', async () => {
      const result = await client.insert(<IClaim[]>testData);
      expect.assertions(5);
      expect(result).toEqual('success');
      expect(collections).toHaveBeenCalledTimes(1);
      expect(dropCollection).toHaveBeenCalledTimes(1);
      expect(createCollection).toHaveBeenCalledWith('claims');
      expect(collection).toHaveBeenCalledWith('claims');
    });

    it('fails to insert data into mongodb', async () => {
      let result;
      expect.assertions(6);
      try {
        result = await client.insert(<IClaim[]>testData);
      } catch (err) {
        expect(err).toEqual(new Error('contrived error'));
        expect(result).toBe(undefined);
      }
      expect(collections).toHaveBeenCalledTimes(1);
      expect(dropCollection).toHaveBeenCalledTimes(0);
      expect(createCollection).toHaveBeenCalledTimes(0);
      expect(collection).toHaveBeenCalledTimes(0);
    });

    it('fails to insert with bad connection', async () => {
      let result;
      client = new DbClient({
        url: 'http://test',
        port: 27017,
        dbName: 'test-db'
      });
      expect.assertions(6);
      try {
        result = await client.insert(<IClaim[]>testData);
      } catch (err) {
        expect(err).toEqual(new Error('db is not defined'));
      }
      expect(result).toBe(undefined);
      expect(collections).toHaveBeenCalledTimes(0);
      expect(dropCollection).toHaveBeenCalledTimes(0);
      expect(createCollection).toHaveBeenCalledTimes(0);
      expect(collection).toHaveBeenCalledTimes(0);
    });
  });

  describe('data retrieval', () => {
    describe('getTarget', () => {
      let client: DbClient;
      let dbInitArgs: IDbClientOptions;
      let mockTargetParams: ITargetParams;

      beforeAll(() => {
        dbInitArgs = {
          url: 'http://mongodb',
          port: 27017,
          dbName: 'test-db'
        };
        mockTargetParams = {
          subject: 'Math',
          grades: ['5', '6'],
          claimNumber: 'C2',
          targetShortCode: '1234'
        };
        client = new DbClient(dbInitArgs);
      });

      it('gets Target by ITargetParams', async () => {
        await client.connect();
        const result = await client.getTarget(mockTargetParams);
        expect.assertions(1);
        expect(result).toEqual({ target: [{ shortCode: '1234', test: 'passed' }] });
      });

      it('throws error getting Target', async () => {
        let result;
        try {
          result = await client.getTarget(mockTargetParams);
        } catch (err) {
          expect.assertions(1);
          expect(err).toEqual(new Error('error'));
        }
      });

      it('throws error when db is not defined', async () => {
        let result;
        try {
          await client.connect();
          result = await client.getTarget(mockTargetParams);
        } catch (err) {
          expect.assertions(1);
          expect(err).toEqual(new Error('db is not defined'));
        }
      });
    });

    describe('getClaims', () => {
      let client: DbClient;
      let dbInitArgs: IDbClientOptions;

      beforeAll(async () => {
        dbInitArgs = {
          url: 'http://mongodb',
          port: 27017,
          dbName: 'test-db'
        };
        client = new DbClient(dbInitArgs);
      });

      it('returns array of Claims', async () => {
        await client.connect();
        const result = await client.getClaims();
        expect.assertions(1);
        expect(collection).toHaveBeenCalledWith('claims');
      });

      it('throws error getting Claims', async () => {
        try {
          const result = await client.getClaims();
        } catch (error) {
          expect.assertions(1);
          expect(error).toEqual(new Error('no result'));
        }
      });

      it('throws error when db is not connected', async () => {
        try {
          await client.connect();
          const result = await client.getClaims();
        } catch (error) {
          expect.assertions(1);
          expect(error).toEqual(new Error('db is not defined'));
        }
      });
    });
  });
});
