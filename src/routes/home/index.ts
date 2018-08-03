import { NextFunction, Response, Request } from 'express';

export function home(req: Request, res: Response, next: NextFunction) {
  res.send('Hello, World');
}