import { Request } from 'express';
import { DbClient, IDbClient } from '../../dal/interface';
import { InsertWriteOpResult } from 'mongodb';
import { data } from './output';
import { applyTracing } from '../../utils/tracer/index';
import { CSEResponse } from '../../server/index';


export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
    const dbArgs: IDbClient = {
        url: 'mongodb://mongo',
        port: 27017,
        dbName: 'cse'
    };
    const client: DbClient = new DbClient(dbArgs);
    await client.connect();
    const result: InsertWriteOpResult | undefined = await client.insert(data);
    res.header('Content-Type', 'application/json');
    res.send(result ? result.result : 'Nope');
};


export const dbInit = applyTracing('/init', handler);
