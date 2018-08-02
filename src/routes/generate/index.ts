import { NextFunction, Response, Request } from 'express';

export function generate(req: Request, res: Response, next: NextFunction) {
  res.send('Hello, World');
}