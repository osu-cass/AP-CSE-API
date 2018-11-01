// tslint:disable:no-require-imports no-var-requires no-any no-unsafe-any
import { logger } from '../logger';
import { Tracer } from 'opentracing';
import { Request, RequestHandler, NextFunction } from 'express';
import { CSEResponse } from '../../server';
const initTracer: (config: object, options: object) => Tracer = require('jaeger-client').initTracer;

const {
  JAEGER_COLLECTOR_HOSTNAME: host = 'jaeger-collector',
  JAEGER_COLLECTOR_PORT: port = '14268',
  API_VERSION: apiVersion = 'dev'
} = process.env;

const collectorEndpoint: string = `http://${host}:${port}/api/traces`;

export const createTracer: () => Tracer = () => {
  const config: any = {
    serviceName: 'cse-api',
    reporter: {
      collectorEndpoint
    }
  };
  const options: any = {
    logger,
    tags: {
      'cse-api': apiVersion
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
