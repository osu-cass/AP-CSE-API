import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { CSEResponse } from '../../server';

interface IQuery {
  query: string;
}

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
  const { query }: IQuery = <IQuery>req.params;
  const { searchClient } = res.locals;
  let result;
  try {
    result = await searchClient.search(query);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
  res.status(200);
  res.send(result);
};

export const search = applyTracing('/search', handler);
