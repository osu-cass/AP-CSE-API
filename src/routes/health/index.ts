import { Request } from 'express';
import { CSEResponse } from '../../server';
import { applyTracing } from '../../utils/tracer';

export enum Health {
  good,
  bad,
  busy
}

export async function handler(req: Request, res: CSEResponse) {
  try {
    const dbHealth = await res.locals.dbClient.ping();
    const searchHealth = await res.locals.searchClient.ping();
    if (dbHealth === Health.good && searchHealth === Health.good) {
      res.sendStatus(200);
    } else {
      res.sendStatus(202);
    }
  } catch (err) {
    res.sendStatus(500);
  }
}
export const healthCheck = applyTracing('/health', handler);
