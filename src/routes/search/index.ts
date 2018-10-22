import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { CSEResponse } from '../../server';
import { IQueryParams } from '../';
import { setRouteHealth, Health } from '../health';

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
  const { ...query }: IQueryParams = <IQueryParams>req.query;
  const { searchClient } = res.locals;
  let result;
  try {
    setRouteHealth(Health.busy, req);
    result = await searchClient.search(query);
  } catch (err) {
    setRouteHealth(Health.good, req);
    res.status(500);
    res.send(err);
  }
  res.status(200);
  setRouteHealth(Health.good, req);
  res.send(result);
};

export const search = applyTracing('/search', handler);
