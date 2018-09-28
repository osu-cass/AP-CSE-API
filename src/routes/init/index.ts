import { Request } from 'express';
import { InsertWriteOpResult } from 'mongodb';
import { importDbEntries } from './db/index';
import { applyTracing } from '../../utils/tracer/index';
import { CSEResponse } from '../../server/index';
import { IClaim } from '../../models/claim/index';

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
  const { dbClient } = res.locals;
  let result: InsertWriteOpResult | undefined;
  try {
    const output: IClaim[] = await importDbEntries();
    await dbClient.connect();
    // tslint:disable-next-line
    result = await dbClient.insert(output);
  } catch (err) {
    throw err;
  }
  res.header('Content-Type', 'application/json');
  res.send(result ? result.result : 'Nope');
};

export const dbInit = applyTracing('/init', handler);
