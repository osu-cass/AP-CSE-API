import { Request } from 'express';
import { CSEResponse } from '../../server/index';
import { applyTracing } from '../../utils/tracer/index';
import { setRouteHealth, Health } from '../health';

export const handler = (req: Request, res: CSEResponse): void => {
  setRouteHealth(Health.busy, req);
  res.send('search endpoint');
  setRouteHealth(Health.good, req);
};

export const search = applyTracing('/search', handler);
