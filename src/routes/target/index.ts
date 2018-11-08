import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { CSEResponse, ResponseContext } from '../../server';
import { ITargetShortCode } from '..';

export const handler = async (req: Request, res: CSEResponse) => {
  const { dbClient }: ResponseContext = res.locals;
  const { targetShortCode }: ITargetShortCode = <ITargetShortCode>req.params;
  let result: object | undefined;
  try {
    await dbClient.connect();
    result = await dbClient.getTarget(targetShortCode);
    result ? res.status(200) : res.sendStatus(400);
    await dbClient.close();
  } catch (error) {
    res.sendStatus(500);
  }
  res.send(result);
};

export const target = applyTracing('/target', handler);
