import { Request } from 'express';
import { InsertWriteOpResult } from 'mongodb';
import { importDbEntries } from '../../dal/import';
import { applyTracing } from '../../utils/tracer';
import { CSEResponse } from '../../server';
import { IClaim } from '../../models/claim';
import { setRouteHealth, Health } from '../health';

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
  const { dbClient, searchClient } = res.locals;
  let result: InsertWriteOpResult | undefined;
  try {
    setRouteHealth(Health.busy, req);
    const output: IClaim[] = await importDbEntries();
    await dbClient.connect();
    result = await dbClient.insert(output);
    await searchClient.insertDocuments(await dbClient.getClaims());
    await dbClient.close();
    res.status(200);
  } catch (err) {
    res.status(500);
    setRouteHealth(Health.good, req);
  }
  res.header('Content-Type', 'application/json');
  res.send(result ? result.result : 'insert failed');
  setRouteHealth(Health.good, req);
};

export const dbInit = applyTracing('/init', handler);
