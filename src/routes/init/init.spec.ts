import { handler as dbInit } from './index';
import { Request } from 'express';
import { CSEResponse } from '../../server/index';

jest.mock('express');
jest.mock('./db/index', () => ({
    importDbEntries: jest.fn().mockResolvedValueOnce('{}').mockResolvedValueOnce('{}').mockImplementationOnce(() => {
        const err = new Error('I am Error.');
        throw err;
    })
}));

jest.mock('../../dal/interface', () => {
    return {
        DbClient: jest.fn().mockImplementationOnce(() => ({
            connect: jest.fn().mockResolvedValue({}),
            insert: jest.fn().mockResolvedValue({ result: 'good' })
        })).mockImplementationOnce(() => ({
            connect: jest.fn().mockResolvedValue({}),
            insert: jest.fn().mockResolvedValue(undefined)
        })).mockImplementationOnce(() => ({
            connect: jest.fn().mockResolvedValue({}),
            insert: jest.fn().mockResolvedValue(undefined)
        }))
    };
});

describe('init', () => {
    let req: Partial<Request>;
    let res: Partial<CSEResponse>;

    beforeAll(() => {
        req = {};
        res = {
            header: jest.fn(),
            send: jest.fn(),
        };
    });

    it('initializes the database with data', async () => {
        expect.assertions(1);
        await dbInit(<Request>req, <CSEResponse>res);
        expect(res.send).toBeCalledWith('good');
    });

    it('fails to init database', async () => {
        expect.assertions(1);
        await dbInit(<Request>req, <CSEResponse>res);
        expect(res.send).toBeCalledWith('Nope');
    });
    it('throws an error', async () => {
        try {
            await dbInit(<Request>req, <CSEResponse>res);
        }
        catch (err) {
            expect(err).toEqual(new Error('I am Error.'));
        }
    });
});