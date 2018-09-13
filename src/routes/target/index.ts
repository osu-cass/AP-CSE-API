import { Request, Response } from 'express';
import { applyTracing } from '../../utils/tracer/index';

export interface ITargetParams {
    subject: string;
    grade: string[] | number;
    claim: number;
    target: number;
}

export const handler = (req: Request, res: Response) => {
    // const { dbClient } = res.locals;
    // const targetParams: ITargetParams = req.params;
    // console.log(targetParams);
    res.send('target endpoint');
};

export const target = applyTracing('/target', handler);