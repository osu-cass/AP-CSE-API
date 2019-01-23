import { Request, Response, NextFunction, RequestHandler } from 'express';
// tslint:disable:no-any no-unsafe-any

const initKey: string = 'sb_init_CSE_database=AND=elasticsearch';

export const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const { key } = req.body;
  if (key === initKey) {
    next();
  } else {
    res.status(401).send('unauthorized');
  }
};
