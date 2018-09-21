import { Request } from 'express';
import { DbClient, IDbClient } from '../../dal/interface';
import { InsertWriteOpResult } from 'mongodb';
import { data } from './output';
import { applyTracing } from '../../utils/tracer/index';
import { CSEResponse } from '../../server/index';


export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
    let result: InsertWriteOpResult | undefined;
    const { searchClient } = res.locals;
    const dbArgs: IDbClient = { url: 'mongodb://mongo', port: 27017, dbName: 'cse' };
    try {
        const client: DbClient = new DbClient(dbArgs);
        await client.connect();
        result = await client.insert(data);
        await searchClient.insertDocuments(await client.getClaims());
        await client.close();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
    res.header('Content-Type', 'application/json');
    res.status(200);
    res.send(result ? result.result : 'insert failed');
};


export const dbInit = applyTracing('/init', handler);
