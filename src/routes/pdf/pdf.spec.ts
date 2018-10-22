import { handler as pdfDownload } from '.';
import { Request, Response } from 'express';
jest.mock('../health');

describe('PDF generation middleware function', () => {
  it('returns a response', () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      send: jest.fn()
    };

    pdfDownload(<Request>req, <Response>res);

    expect(res.send).toBeCalledWith('pdf endpoint');
  });
});
