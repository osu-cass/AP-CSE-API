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

export const handler = (req: Request, res: CSEResponse) => {
    const dbClient: DbClient = res.locals.dbClient;
    const targetParams: ITargetParams = req.params as ITargetParams;
    let results;
    dbClient.connect().then(async () => {
        try {
            results = await dbClient.getTargets(targetParams);
            res.send(results);
        } catch (error) {
            throw error;
        }
    }).catch((error) => {
        res.send(error);
    });
};

export const target = applyTracing('/target', handler);