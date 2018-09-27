import { Request } from 'express';
import { InsertWriteOpResult } from 'mongodb';
import { importDbEntries } from './db/index';
import { applyTracing } from '../../utils/tracer/index';
import { CSEResponse } from '../../server/index';
import { IClaim } from '../../models/claim/index';
import { IDbClient, DbClient } from '../../dal/interface/index';

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
    try {
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
    } catch (err) {
        throw err;
    }
};

export const dbInit = applyTracing('/init', handler);
