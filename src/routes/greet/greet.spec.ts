import { Request, Response } from 'express';
import { greet } from './';

describe('Greet middleware function', () => {
  it('Greets a user', () => {
    const req: Partial<Request> = {
      user: {
        name: 'Thomas Noelcke'
      }
    };
    const res: Partial<Response> = {
      send: jest.fn()
    };

    greet(<Request>req, <Response>res);

    expect(res.send).toBeCalledWith(`Hello, Thomas Noelcke`);
  });
});