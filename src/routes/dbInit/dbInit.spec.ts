import { dbInit } from './';
import { Request, Response } from 'express';
import { DbClient } from '../../dal/interface';
import { data } from './output';
import { request } from 'http';

jest.mock('express');

jest.mock('../../dal/interface', () => {
    // tslint:disable:no-function-expression
    return {
        DbClient: jest.fn().mockImplementationOnce(() => {
            return {
                connect: jest.fn().mockResolvedValue({}),
                insert: jest.fn()
                    .mockResolvedValueOnce({ result: 'good'})
            };
        }).mockImplementationOnce(() => {
            return {
                connect: jest.fn().mockResolvedValue({}),
                insert: jest.fn()
                    .mockResolvedValueOnce(undefined)
            };
        })
    };
});


describe('dbInit', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeAll(() => {
        req = {};
        res = {
            setHeader: jest.fn(),
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