import { Request, Response, Send, NextFunction } from 'express';

export interface MockResponse extends Response {
  send: MockSend;
}

export interface MockSend extends Send {
  mock: jest.MockContext<MockSend>;
}