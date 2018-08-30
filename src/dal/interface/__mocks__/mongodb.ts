let MongoClient = require.requireActual('mongodb').MongoClient;

MongoClient = {
    ...MongoClient,
    // tslint:disable-next-line:no-empty
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

const db = MongoClient.db;

const close = MongoClient.close;

export { MongoClient, db, close };