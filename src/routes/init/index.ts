import { Request } from 'express';
import { InsertWriteOpResult } from 'mongodb';
import { importDbEntries } from './db/index';
import { applyTracing } from '../../utils/tracer/index';
import { CSEResponse } from '../../server/index';
import { IClaim } from '../../models/claim/index';
import { setRouteHealth, Health } from '../health';

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
  let result: InsertWriteOpResult | undefined;
  const { searchClient } = res.locals;
  const { dbClient } = res.locals;
  try {
    setRouteHealth(Health.busy, req);
    const output: IClaim[] = await importDbEntries();
    await dbClient.connect();
    result = await dbClient.insert(output);
    await searchClient.insertDocuments(await dbClient.getClaims());
    await dbClient.close();
  } catch (err) {
    res.status(500);
    res.send(err);
    setRouteHealth(Health.good, req);
  }
  res.header('Content-Type', 'application/json');
  res.status(200);
  res.send(result ? result.result : 'insert failed');
  setRouteHealth(Health.good, req);
};

export const dbInit = applyTracing('/init', handler);
