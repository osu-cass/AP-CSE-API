// tslint:disable:no-require-imports no-var-requires no-any no-unsafe-any
import { logger } from '../logger';
import { Tracer } from 'opentracing';
import { Request, RequestHandler, NextFunction } from 'express';
import { CSEResponse } from '../../server/index';
const initTracer: (config: object, options: object) => Tracer = require('jaeger-client').initTracer;

export const createTracer: () => Tracer = () => {
  const config: any = {
    serviceName: 'cse-api',
    reporter: {
      collectorEndpoint: 'http://jaeger-collector:14268/api/traces'
    }
  };
  const options: any = {
    logger,
    tags: {
      'cse-api': '0.0.0'
    }
  };

  return initTracer(config, options);
};

// tslint:enable:no-require-imports no-var-requires no-any no-unsafe-any

export const applyTracing = (event: string, handler: RequestHandler) => (
  request: Request,
  response: CSEResponse,
  next?: NextFunction
) => {
  const { span } = response.locals;
  const childSpan = span.tracer().startSpan(event, { childOf: span.context() });
  childSpan.log({ event, status: 'beginning' }, Date.now());
  handler(request, response, <NextFunction>next);
  childSpan.log({ event, status: 'complete' }, Date.now());
  childSpan.finish();
};
