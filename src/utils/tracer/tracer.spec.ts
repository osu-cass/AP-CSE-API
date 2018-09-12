import { createTracer, applyTracing  } from '.';
import { RequestHandler, Request, Response } from 'express';
import { NextFunction } from 'connect';
import { initTracer } from '../../__mocks__/jaeger-client';

jest.mock('jaeger-client', () => ({
    initTracer: jest.fn()
}));

describe('tracer', () => {

    describe('createTracer', () => {
        // tslint:disable:no-any no-unsafe-any
        let tracer: any;

        beforeAll(() => {
            tracer = createTracer();
        });

        it('returns Tracer object', () => {
            expect.assertions(1);
            expect(initTracer).toHaveBeenCalled();
        });
    });

    describe('applyTracing', () => {
        // tslint:disable-next-line:prefer-const
        let req: Partial<Request>;
        let res: Partial<Response>;
        let handler: RequestHandler;
        let mockRequest: jest.Mock;

        beforeAll(() => {
            req = {};
            res = {
                locals: {
                    span: {
                        context: jest.fn(),
                        tracer: jest.fn().mockImplementation(() => ({
                            startSpan: jest.fn().mockImplementation(() => ({
                                log: jest.fn(),
                                finish: jest.fn()
                            })),

                        }))
                    }
                }
            };
            mockRequest = jest.fn().mockImplementation((req: Request, res: Response, next: NextFunction) => jest.fn());
            handler = jest.fn().mockImplementation(mockRequest());
        });

        it('applies tracing to request', () => {
            const wrappedHandler = applyTracing('/test', handler);
            wrappedHandler(<Request>req, <Response>res);
            expect.assertions(2);
            expect(handler).toHaveBeenCalledTimes(1);
            expect(mockRequest).toHaveBeenCalledTimes(1);
        });
    });

});