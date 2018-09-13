import { Request, Response } from 'express';
import { applyTracing } from '../../utils/tracer/index';

export const handler = (req: Request, res: Response) => {
    res.send('target endpoint');
};

export const target = applyTracing('/target', handler);