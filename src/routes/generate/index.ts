import { NextFunction, Response, Request } from '../../../node_modules/@types/express';

export function generate(req: Request, res: Response, next: NextFunction) {
  res.send('Hello, World');
}