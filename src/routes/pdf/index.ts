import { Request } from 'express';
import { CSEResponse } from '../../server';
import { applyTracing } from '../../utils/tracer';
import { setRouteHealth, Health } from '../health';

export const handler = (req: Request, res: CSEResponse): void => {
  setRouteHealth(Health.busy, req);
  res.send('pdf endpoint');
  setRouteHealth(Health.good, req);
};

export const pdfDownload = applyTracing('/pdf', handler);
