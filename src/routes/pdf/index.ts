import { Request } from 'express';
import { CSEResponse } from '../../server/index';
import { applyTracing } from '../../utils/tracer';

export const handler = (req: Request, res: CSEResponse): void => {
  res.send('pdf endpoint');
};

export const pdfDownload = applyTracing('/pdf', handler);