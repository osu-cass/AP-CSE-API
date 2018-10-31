import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { setRouteHealth, Health } from '../health';
import { CSEResponse, ResponseContext } from '../../server';
import { ITargetParams } from '..';

export const handler = async (req: Request, res: CSEResponse) => {
  const { dbClient }: ResponseContext = res.locals;
  const { ...params }: ITargetParams = <ITargetParams>req.params;
  let results;
  try {
    setRouteHealth(Health.busy, req);
    await dbClient.connect();
    results = await dbClient.getTarget(params);
    await dbClient.close();
  } catch (error) {
    res.status(500);
    res.send(error);
    setRouteHealth(Health.good, req);
  }
  res.status(200);
  res.send(results);
  setRouteHealth(Health.good, req);
};

export const target = applyTracing('/target', handler);
