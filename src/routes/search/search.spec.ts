import { handler as search } from './';
import { Request, Response } from 'express';

describe('search', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeAll(()=> {
        req = {};
        res = {
            send: jest.fn()
        };
    });

    it('handles search request', (() => {
        search(<Request>req, <Response>res);
        expect(res.send).toHaveBeenCalledWith('search endpoint');
    }));

});