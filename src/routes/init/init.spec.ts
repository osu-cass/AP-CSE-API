import { handler as dbInit } from './index';
import { Request, Response} from 'express';

jest.mock('express');

jest.mock('../../dal/interface', () => {
    return {
        DbClient: jest.fn().mockImplementationOnce(() => ({
            connect: jest.fn().mockResolvedValue({}),
            insert: jest.fn().mockResolvedValue({ result: 'good' })
        })).mockImplementationOnce(() => ({
            connect: jest.fn().mockResolvedValue({}),
            insert: jest.fn().mockResolvedValue(undefined)
        }))
    };
});


describe('init', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeAll(() => {
        req = {};
        res = {
            header: jest.fn(),
            send: jest.fn()
        };
    });


    it('initializes the database with data', async () => {
        expect.assertions(1);
        await dbInit(<Request>req, <Response>res);
        expect(res.send).toBeCalledWith('good');
    });

    it('fails to init database', async () => {
        expect.assertions(1);
        await dbInit(<Request>req, <Response>res);
        expect(res.send).toBeCalledWith('Nope');
    });
});