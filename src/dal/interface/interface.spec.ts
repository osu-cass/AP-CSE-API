import { DbClient, IDbClient } from './index';
import { MongoClient } from 'mongodb';
import { db, close,collection, collections, dropCollection, createCollection } from '../../__mocks__/mongodb';

describe('MongoDb Database client', () => {

    describe('DbClient initialization', () => {
        let dbInitArgs: IDbClient;
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
                    user: 'root',
                    password: 'example'
                }
            };
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
            expect.assertions(2);
            expect(MongoClient.connect).toHaveBeenCalledWith(uri, authInfo);
            expect(db).toHaveBeenCalledWith(dbName);
        });

        it('throws error on connection to database by name', async () => {
            expect.assertions(3);
            try {
                await client.connect();
            } catch (err) {
                expect(err).toEqual(new Error('db init failed'));
            }
            expect(MongoClient.connect).toHaveBeenCalledWith(uri, authInfo);
            expect(db).toHaveBeenCalledTimes(1);
        });

        it('throws error on connection', async () => {
            expect.assertions(3);
            try {
                await client.connect();
            } catch (err) {
                expect(err).toEqual({ error: { message: 'connect failed' } });
            }
            expect(MongoClient.connect).toHaveBeenCalledWith(uri, authInfo);
            expect(db).toHaveBeenCalledTimes(0);
        });

    });

    describe('data insertion', () => {
        let client: DbClient;
        let dbInitArgs: IDbClient;
        let testData: object[];

        beforeAll(() => {
            dbInitArgs = {
                url: 'http://mongodb',
                port: 27017,
                dbName: 'test-db'
            };
            client = new DbClient(dbInitArgs);
            testData = [{ value: 'text' }];
        });

        afterEach(() => {
            collection.mockClear();
            collections.mockClear();
            dropCollection.mockClear();
            createCollection.mockClear();
        });

        it('successfully inserts data into mongodb', async () => {
            await client.connect();
            const result = await client.insert(testData);
            expect.assertions(5);
            expect(result).toEqual('success');
            expect(collections).toHaveBeenCalledTimes(1);
            expect(dropCollection).toHaveBeenCalledTimes(0);
            expect(createCollection).toHaveBeenCalledWith('claims');
            expect(collection).toHaveBeenCalledWith('claims');
        });

        it('successfully replaces data in mongodb', async () => {
            const result = await client.insert(testData);
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
                result = await client.insert(testData);
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
                result = await client.insert(testData);
            } catch(err) {
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
            client.getTargets('');
            expect.assertions(0);
        });

        it('gets data by filter parameter', () => {
            client.getBySearchParam('');
            expect.assertions(0);
        });
    });

});