import { Response, Request } from 'express';

export function greet(req: Request, res: Response) {
  res.send(`Hello, ${req.user.name}`);
}