import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { setRouteHealth, Health } from '../health';
import { CSEResponse, ResponseContext } from '../../server';
import { ITargetParams } from '..';

export const handler = async (req: Request, res: CSEResponse) => {
  const { dbClient }: ResponseContext = res.locals;
  const { ...params }: ITargetParams = <ITargetParams>req.params;
  let result: object | undefined;
  try {
    setRouteHealth(Health.busy, req);
    await dbClient.connect();
    result = await dbClient.getTarget(params);
    await dbClient.close();
    res.status(200);
  } catch (error) {
    res.status(500);
    // tslint:disable-next-line:no-any no-unsafe-any
    result = error;
    setRouteHealth(Health.good, req);
  }
  res.send(result);
  setRouteHealth(Health.good, req);
};

export const target = applyTracing('/target', handler);
