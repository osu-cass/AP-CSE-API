import { Response, Request } from 'express';

export function home(req: Request, res: Response) {
  res.send('Hello, World');
}