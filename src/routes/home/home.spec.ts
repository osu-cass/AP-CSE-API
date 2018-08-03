import { home } from '.';
import { Request, Response, NextFunction, Send } from 'express';

describe('PDF generation middleware function', () => {
  it('returns Hello World', () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      send: jest.fn()
    };

    home(<Request>req, <Response>res);

    expect(res.send).toBeCalledWith('Hello, World');
  });
});
