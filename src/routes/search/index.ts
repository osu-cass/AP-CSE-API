import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { CSEResponse } from '../../server';
import { IQueryParams } from '../';

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
  const { ...query }: IQueryParams = <IQueryParams>req.query;
  const { searchClient } = res.locals;
  let result;
  try {
    result = await searchClient.search(query);
    res.status(200);
  } catch (error) {
    res.status(500);
    // tslint:disable-next-line:no-any no-unsafe-any
    result = error;
  }
  res.send(result);
};

export const search = applyTracing('/search', handler);
