// tslint:disable
let MongoClient = require.requireActual('mongodb').MongoClient;

const findOne = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({ target: [{ shortCode: '1234', test: 'passed' }] })
  )
  .mockImplementationOnce(() => Promise.reject(new Error('error')));

const database = {
  collection: jest
    .fn()
    .mockImplementation(() => ({ findOne, insertMany: jest.fn().mockResolvedValue('success') })),
  collections: jest
    .fn()
    .mockImplementationOnce(() => [{ collectionName: 'not-claims' }])
    .mockImplementationOnce(() => [{ collectionName: 'claims' }])
    .mockImplementationOnce(() => {
      throw new Error('contrived error');
    }),
  dropCollection: jest.fn(),
  createCollection: jest.fn()
};

MongoClient = {
  ...MongoClient,
  db: jest
    .fn()
    .mockImplementationOnce(() => ({ ...database }))
    .mockImplementationOnce(() => {
      throw new Error('db init failed');
    })
    .mockImplementationOnce(() => ({ ...database }))
    .mockImplementationOnce(() => ({ ...database })),
  close: jest.fn()
};

MongoClient.connect = jest
  .fn()
  .mockResolvedValueOnce({ db: MongoClient.db, close: MongoClient.close })
  .mockResolvedValueOnce({ db: MongoClient.db, close: MongoClient.close })
  .mockRejectedValueOnce({ error: { message: 'connect failed' } })
  .mockResolvedValueOnce({ db: MongoClient.db, close: MongoClient.close })
  .mockResolvedValueOnce({ db: MongoClient.db, close: MongoClient.close })
  .mockResolvedValueOnce({ db: jest.fn(), close: MongoClient.close });

const db: jest.Mock = MongoClient.db;
const close: jest.Mock = MongoClient.close;
const collections: jest.Mock = database.collections;
const dropCollection: jest.Mock = database.dropCollection;
const createCollection: jest.Mock = database.createCollection;
const collection: jest.Mock = database.collection;

export { MongoClient, db, close, collections, dropCollection, createCollection, collection };
