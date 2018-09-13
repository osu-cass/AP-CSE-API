import { handler as target } from './index';
import { Request, Response } from 'express';

describe('target', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeAll(()=> {
        req = {};
        res = {
            send: jest.fn()
        };
    });

    it('handles request for target', (() => {
        target(<Request>req, <Response>res);
        expect(res.send).toHaveBeenCalledWith('filter endpoint');
    }));

});