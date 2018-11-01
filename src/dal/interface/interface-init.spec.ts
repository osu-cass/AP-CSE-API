import { IDbClientOptions, DbClient } from '.';
import { Db, MongoClient } from 'mongodb';

/*
    This test suite is for the initialization and construction process
    of the DbClient class. They test that the expected errors are throiwn or
    the correct connections are made.
*/

describe('MongoDb client', () => {
  let db: jest.Mock;
  let close: jest.Mock;
  let connect: jest.Mock;

  beforeAll(() => {
    db = jest
      .fn()
      .mockImplementationOnce(() => ({}))
      .mockImplementationOnce(() => {
        throw new Error('db connect failed');
      });

    close = jest
      .fn()
      .mockImplementationOnce(() => ({}))
      .mockImplementationOnce(() => new Error('error'));

    connect = jest
      .fn()
      .mockResolvedValueOnce({ db, close })
      .mockResolvedValueOnce({ db, close })
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

  describe('initialization', () => {
    let dbInitArgs: IDbClientOptions;
    let uri: string;
    let client: DbClient;
    let authInfo: object;

    beforeAll(() => {
      dbInitArgs = {
        url: 'http://mongodb',
        port: 27017,
        dbName: 'test-db'
      };

      uri = `${dbInitArgs.url}:${dbInitArgs.port}`;

      authInfo = {
        auth: {
          user: process.env.MONGO_USERNAME || '',
          password: process.env.MONGO_PASSWORD || ''
        }
      };
    });

    afterEach(() => {
      db.mockClear();
      close.mockClear();
      connect.mockClear();
    });

    it('constructs DbClient', () => {
      const { dbName } = dbInitArgs;
      client = new DbClient(dbInitArgs);
      expect.assertions(2);
      expect(client.uri).toEqual(uri);
      expect(client.dbName).toEqual(dbName);
    });

    it('connects to db succesfully', async () => {
      const { dbName } = dbInitArgs;
      await client.connect();
      expect.assertions(2);
      expect(connect).toHaveBeenCalledWith(uri, authInfo);
      expect(db).toHaveBeenCalledWith(dbName);
    });

    it('throws error on connection to database by name', async () => {
      expect.assertions(3);
      try {
        await client.connect();
      } catch (err) {
        expect(err).toEqual(new Error('db connect failed'));
      }
      expect(connect).toHaveBeenCalledWith(uri, authInfo);
      expect(db).toHaveBeenCalledTimes(1);
    });

    it('throws error on connection', async () => {
      expect.assertions(3);
      try {
        await client.connect();
      } catch (err) {
        expect(err).toEqual(new Error('connect failed'));
      }
      expect(connect).toHaveBeenCalledWith(uri, authInfo);
      expect(db).toHaveBeenCalledTimes(0);
    });

    it('closes the db client', async () => {
      await client.close();
      expect.assertions(1);
      expect(close).toHaveBeenCalledTimes(1);
    });

    it('throws error when closing client', async () => {
      try {
        await client.close();
      } catch (err) {
        expect.assertions(2);
        expect(err).toEqual(new Error('error occured closing client'));
        expect(close).toHaveBeenCalledTimes(1);
      }
    });

    it('throws error when client is undefined', async () => {
      const mockClient = new DbClient(dbInitArgs);
      try {
        await mockClient.close();
      } catch (err) {
        expect.assertions(2);
        expect(err).toEqual(new Error('client is already closed'));
        expect(close).toHaveBeenCalledTimes(0);
      }
    });
  });
});
