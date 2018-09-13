import { handler as home } from '.';
import { Request, Response } from 'express';

describe('PDF generation middleware function', () => {
  it('returns a response', () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      send: jest.fn()
    };

    home(<Request>req, <Response>res);

    expect(res.send).toBeCalledWith('pdf endpoint');
  });
});
