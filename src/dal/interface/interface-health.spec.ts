import { DbClient, IDbClientOptions } from './index';
import { IClaim } from '../../models/claim/index';
import { Health } from '../../routes/health/index';
import { MongoClient } from 'mongodb';

jest.mock('../search', () => {
  return {
    SearchClient: jest.fn().mockImplementation(() => ({
      insertDocuments: jest.fn().mockResolvedValue({})
    }))
  };
});

/*
  This suite tests the healthcheck routinefor the db client and makes
  sure that it sets that health of the database as expected.
*/

describe('MongoDb client interface', () => {
  let db: jest.Mock;
  let command: jest.Mock;
  let connect: jest.Mock;
  let close: jest.Mock;

  beforeAll(() => {
    command = jest
      .fn()
      .mockResolvedValueOnce({ ok: 1 })
      .mockResolvedValueOnce({ ok: 666 });

    db = jest.fn().mockImplementation(() => ({ command }));

    close = jest.fn();

    connect = jest
      .fn()
      .mockRejectedValueOnce(new Error())
      .mockResolvedValueOnce({ close, db: jest.fn() })
      .mockResolvedValueOnce({ db, close })
      .mockResolvedValueOnce({ db, close });

    jest.mock('mongodb', () => ({
      MongoClient: {
        db,
        connect,
        close
      }
    }));

    MongoClient.connect = connect;
  });

  describe('ping test', () => {
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

    it('pings the database', async () => {
      expect.assertions(4);
      expect(await client.ping()).toBe(Health.bad);
      expect(await client.ping()).toBe(Health.bad);
      expect(await client.ping()).toBe(Health.good);
      expect(await client.ping()).toBe(Health.busy);
    });
  });
});
