import { Request, Response } from 'express';
import { applyTracing } from '../../utils/tracer/index';

export const handler = (req: Request, res: Response) => {
    res.send('filter endpoint');
};

export const target = applyTracing('/filter', handler);