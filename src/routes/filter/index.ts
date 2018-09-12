import { Request, Response, RequestHandler } from 'express';
import { applyTracing } from '../../utils/tracer/index';

export const handler = (req: Request, res: Response) => {
    res.send('filter endpoint');
};

export const filter = applyTracing('/filter', handler);