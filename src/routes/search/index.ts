import {Request, Response} from 'express';

export function search(req: Request, res: Response) {
    res.send('search endpoint');
}