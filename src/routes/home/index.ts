import { Response, Request } from 'express';
import { Span, Tags } from 'opentracing';
import { CSEResponse } from '../../server/index';

export function home(req: Request, res: CSEResponse): void {
  const { span } = res.locals;
  span.log({event: 'home/', status: 'done'}, Date.now());
  res.send('Hello, World');
  span.finish();
}