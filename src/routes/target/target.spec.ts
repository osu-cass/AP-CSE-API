import { handler as target } from './index';
import { Request, Response } from 'express';

describe('target', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeAll(()=> {
        req = {};
        res = {
            send: jest.fn(),
            locals: {
                dbClient: {
                    connect: jest.fn().mockResolvedValue({}),
                    getTargets: jest.fn().mockResolvedValue({})
                }
            }
        };
    });

    it('handles request for target', (() => {
        target(<Request>req, <Response>res);
        // expect(res.send).toHaveBeenCalledWith('target endpoint');
    }));

});