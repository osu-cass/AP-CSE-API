import {Request, Response, RequestHandler} from 'express';
import { applyTracing } from '../../utils/tracer/index';

export const handler = (req: Request, res: Response): void => {
    res.send('search endpoint');
};

export const search = applyTracing('/search', handler);