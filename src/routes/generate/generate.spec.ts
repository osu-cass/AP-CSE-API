import { generate } from '.';
import { Request, Response, NextFunction, Send } from 'express';
import { MockResponse, MockSend } from '../__mocks__/express';

it('returns Hello World', () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    send: jest.fn()
  };
  const next: Partial<NextFunction> = {};

  generate(<Request>req, <Response>res, <NextFunction>next);

  expect(((<MockResponse>res).send.mock).calls.length).toBe(1);
  expect(((<MockResponse>res).send.mock as jest.MockContext<Send>).calls[0]).toContain('Hello, World');
});
