let MongoClient = require.requireActual('mongodb').MongoClient;

MongoClient = {
    ...MongoClient,
    // tslint:disable-next-line:no-empty
    db: jest.fn().mockImplementationOnce(() => {})
    .mockImplementationOnce(() => {
       throw new Error();
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
        message: 'did not create'
    }
});

const db = MongoClient.db;

const close = MongoClient.close;

export { MongoClient, db, close };