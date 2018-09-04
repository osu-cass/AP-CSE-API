import { filter } from './';
import { Request, Response } from 'express';

describe('filter', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeAll(()=> {
        req = {};
        res = {
            send: jest.fn()
        };
    });

    it('handles filter request', (() => {
        filter(<Request>req, <Response>res);
        expect(res.send).toHaveBeenCalledWith('filter endpoint');
    }));

});