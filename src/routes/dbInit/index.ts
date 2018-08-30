import { Response, Request } from 'express';
import { DbClient, IDbClient } from '../../dal/interface';
import { InsertWriteOpResult } from 'mongodb';
import { data } from './output';


export async function dbInit(req: Request, res: Response) {
    const dbArgs: IDbClient = {
        url: 'mongodb://mongo',
        port: 27017,
        dbName: 'admin'
    };
    const client: DbClient = new DbClient(dbArgs);
    await client.connect();
    const result: InsertWriteOpResult | undefined = await client.insert(data);
    res.setHeader('Content-Type', 'application/json');
    res.send(result ? result.result : 'Nope');
}