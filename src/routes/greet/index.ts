import { Response, Request, RequestHandler } from 'express';
import { applyTracing } from '../../utils/tracer/index';

interface MockRequest extends Request {
  user: User;
}

interface User {
  name: string;
}

export const handler = (req: Request, res: Response) => {
  res.send(`Hello, ${(req as MockRequest).user.name}`);
};

export const greet = applyTracing('/greet', handler);