import { Request } from 'express';
import { applyTracing } from '../../utils/tracer';
import { DbClient } from '../../dal/interface';
import { CSEResponse } from '../../server/index';

export interface ITargetParams {
    subject: string;
    grades: string[] | number;
    claim: number;
    target: number;
}

export const handler = async (req: Request, res: CSEResponse) => {
    const dbClient: DbClient = res.locals.dbClient;
    const targetParams: ITargetParams = req.params as ITargetParams;
    let results;
    try {
        await dbClient.connect();
        results = await dbClient.getTargets(targetParams);
    } catch (error) {
        res.send(error);
    }
    res.send(results);
};

export const target = applyTracing('/target', handler);