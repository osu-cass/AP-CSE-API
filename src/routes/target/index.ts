import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { CSEResponse, ResponseContext } from '../../server';
import { ITargetParams } from '../index';

export const handler = async (req: Request, res: CSEResponse) => {
  const { dbClient }: ResponseContext = res.locals;
  const { ...params }: ITargetParams = <ITargetParams>req.params;
  let results;
  try {
    await dbClient.connect();
    results = await dbClient.getTarget(params);
    await dbClient.close();
  } catch (error) {
    res.status(500);
    res.send(error);
  }
  res.status(200);
  res.send(results);
};

export const target = applyTracing('/target', handler);
