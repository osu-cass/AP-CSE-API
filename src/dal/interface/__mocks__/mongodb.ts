// tslint:disable
let MongoClient = require.requireActual('mongodb').MongoClient;

MongoClient = {
    ...MongoClient,
    db: jest.fn().mockImplementationOnce(() => {})
    .mockImplementationOnce(() => {
       throw new Error('db init failed');
    }),
    close: jest.fn()
};

MongoClient.connect = jest.fn().mockResolvedValueOnce({
    db: MongoClient.db,
    close: MongoClient.close
}).mockResolvedValueOnce({
    db: MongoClient.db,
    close: MongoClient.close
}).mockRejectedValueOnce({
    error: {
        message: 'connect failed'
    }
});

const db: jest.Mock = MongoClient.db;

const close: jest.Mock = MongoClient.close;

export { MongoClient, db, close };