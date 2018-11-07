import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { setRouteHealth, Health } from '../health';
import { CSEResponse, ResponseContext } from '../../server';
import { ITargetShortCode } from '..';

export const handler = async (req: Request, res: CSEResponse) => {
  const { dbClient }: ResponseContext = res.locals;
  const { targetShortCode }: ITargetShortCode = <ITargetShortCode>req.params;
  let result: object | undefined;
  try {
    setRouteHealth(Health.busy, req);
    await dbClient.connect();
    result = await dbClient.getTarget(targetShortCode);
    result ? res.status(200) : res.sendStatus(500);
    await dbClient.close();
  } catch (error) {
    res.sendStatus(500);
    setRouteHealth(Health.good, req);
  }
  res.send(result);
  setRouteHealth(Health.good, req);
};

export const target = applyTracing('/target', handler);
