import { DbClient, IDbClient } from '.';
import { MongoClient } from 'mongodb';
import { db, close, collection, collections, dropCollection, createCollection } from '../../__mocks__/mongodb';
import { ITargetParams } from '../../routes/target';
import { IClaim } from '../../models/claim';

jest.mock('../search', () => {
    return {
        SearchClient: jest.fn().mockImplementation(() => ({
            insertDocuments: jest.fn().mockResolvedValue({})
        }))
    };
});

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
        let testData: Partial<IClaim>[];

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
            let dbInitArgs: IDbClient;
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
                expect(result).toEqual({ shortCode: '1234', test: 'passed' });
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
    });

});