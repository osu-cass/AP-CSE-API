import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { DbClient } from '../../dal/interface';
import { CSEResponse } from '../../server';

export interface ITargetParams {
    subject: string;
    grades: string[] | number;
    claimNumber: string;
    targetShortCode: string;
}

export const handler = async (req: Request, res: CSEResponse) => {
    const dbClient: DbClient = res.locals.dbClient;
    const targetParams: ITargetParams = req.params as ITargetParams;
    let results;
    try {
        await dbClient.connect();
        results = await dbClient.getTarget(targetParams);
        await dbClient.close();
    } catch (error) {
        res.status(500);
        res.send(error);
    }
    res.status(200);
    res.send(results);
};

export const target = applyTracing('/target', handler);