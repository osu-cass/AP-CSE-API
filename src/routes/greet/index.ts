import { Response, Request } from 'express';

interface MockRequest extends Request {
  user: User;
}

interface User {
  name: string;
}

export function greet(req: Request, res: Response) {
  res.send(`Hello, ${(req as MockRequest).user.name}`);
}