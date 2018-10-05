import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { CSEResponse } from '../../server';
import { IQueryParams, ITargetParams } from '../';

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
  const { q }: IQueryParams = <IQueryParams>req.params;
  const { ...target }: ITargetParams = <ITargetParams>req.query;
  const { searchClient } = res.locals;
  let result;
  try {
    result = await searchClient.search(q, target);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
  res.status(200);
  res.send(result);
};

export const search = applyTracing('/search', handler);
