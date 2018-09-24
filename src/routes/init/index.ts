import { Request } from 'express';
import { DbClient, IDbClient } from '../../dal/interface';
import { InsertWriteOpResult } from 'mongodb';
import { importDbEntries } from './import';
import { applyTracing } from '../../utils/tracer/index';
import { CSEResponse } from '../../server/index';
import { IClaim } from '../../models/claim/index';


export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
    const output: IClaim[] = await importDbEntries();
    const dbArgs: IDbClient = {
        url: 'mongodb://mongo',
        port: 27017,
        dbName: 'cse'
    };
    const client: DbClient = new DbClient(dbArgs);
    await client.connect();
    // tslint:disable-next-line
    const result: InsertWriteOpResult | undefined = await client.insert(output);
    res.header('Content-Type', 'application/json');
    res.send(result ? result.result : 'Nope');
};


export const dbInit = applyTracing('/init', handler);
