import { Response, Request, RequestHandler, NextFunction } from 'express';
import { Span, Tags } from 'opentracing';
import { CSEResponse } from '../../server/index';
import { applyTracing } from '../../utils/tracer';

export const handler = (req: Request, res: CSEResponse): void => {
  res.send('pdf endpoint');
};

export const pdfDownload = applyTracing('/', handler);