import { DbClient, IDbClient } from './index';
import { MongoClient } from 'mongodb';
import { db, close } from './__mocks__/mongodb';

jest.mock('mongodb');

describe('MongoDb Database client', () => {

    describe('db initialization', () => {
        let dbInitArgs: IDbClient;

        beforeAll(() => {
            dbInitArgs = {
                url: 'http://mongodb',
                port: 27017,
                dbName: 'test-db'
            };
        });

        beforeEach(() => {
            db.mockClear();
            close.mockClear();
        });

        it('creates DbClient with no errors', async () => {
            const { url, port, dbName } = dbInitArgs;
            const client = await new DbClient(dbInitArgs);
            expect.assertions(3);
            expect(MongoClient.connect).toHaveBeenCalledWith(`${url}:${port}`);
            expect(db).toHaveBeenCalledWith(dbName);
            expect(close).toHaveBeenCalledTimes(1);
        });

        it('throws error when getting db instance', async () => {
            const { url, port, dbName } = dbInitArgs;
            const client = await new DbClient(dbInitArgs);
            expect.assertions(3);
            expect(MongoClient.connect).toHaveBeenCalledWith(`${url}:${port}`);
            expect(db).toHaveBeenCalledWith(dbName);
            expect(close).toHaveBeenCalledTimes(0);
        });

        it('throws error on connection to database uri', () => {
            const { url, port, dbName } = dbInitArgs;
            const client = new DbClient(dbInitArgs);
            expect.assertions(3);
            expect(MongoClient.connect).toHaveBeenCalledWith(`${url}:${port}`);
            expect(db).toHaveBeenCalledTimes(0);
            expect(close).toHaveBeenCalledTimes(0);
        });
    });

    describe('getting data from db', () => {

        it('gets data by search parameter/string', () => {
            expect.assertions(0);
        });

        it('gets data by filter parameter', () => {
            expect.assertions(0);
        });
    })

});