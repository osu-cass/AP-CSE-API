import { DbClient, IDbClient } from './index';
import { MongoClient } from 'mongodb';
import { db, close } from '../../../__mocks__/mongodb';

describe('MongoDb Database client', () => {

    describe('DbClient initialization', () => {
        let dbInitArgs: IDbClient;
        let uri: string;
        let client: DbClient;

        beforeAll(() => {
            dbInitArgs = {
                url: 'http://mongodb',
                port: 27017,
                dbName: 'test-db'
            };
            uri = `${dbInitArgs.url}:${dbInitArgs.port}`;
        });

        beforeEach(() => {
            db.mockClear();
            close.mockClear();
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
            expect.assertions(3);
            expect(MongoClient.connect).toHaveBeenCalledWith(uri);
            expect(db).toHaveBeenCalledWith(dbName);
            expect(close).toHaveBeenCalledTimes(1);
        });

        it('throws error on connection to database by name', async () => {
            expect.assertions(4);
            try {
                await client.connect();
            } catch(err) {
                expect(err).toEqual(new Error('db init failed'));
            }
            expect(MongoClient.connect).toHaveBeenCalledWith(uri);
            expect(db).toHaveBeenCalledTimes(1);
            expect(close).toHaveBeenCalledTimes(0);
        });

        it('throws error on connection', async () => {
            expect.assertions(4);
            try {
                await client.connect();
            } catch(err) {
                expect(err).toEqual({error: {message: 'connect failed'}});
            }
            expect(MongoClient.connect).toHaveBeenCalledWith(uri);
            expect(db).toHaveBeenCalledTimes(0);
            expect(close).toHaveBeenCalledTimes(0);
        });

    });

    describe('getting data from db', () => {
        let client: DbClient;
        let dbInitArgs: IDbClient;

        beforeAll(() => {
            dbInitArgs = {
                url: 'http://mongodb',
                port: 27017,
                dbName: 'test-db'
            };
            client = new DbClient(dbInitArgs);
        });

        it('gets data by search parameter/string', () => {
            client.getByFilter('');
            expect.assertions(0);
        });

        it('gets data by filter parameter', () => {
            client.getBySearchParam('');
            expect.assertions(0);
        });
    });

});