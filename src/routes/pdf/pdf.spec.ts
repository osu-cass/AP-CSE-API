import { handler as pdfDownload } from '.';
import { Request, Response } from 'express';

jest.mock('../health', () => ({
  setRouteHealth: jest.fn().mockResolvedValue('{}'),
  Health: jest.fn().mockImplementation(() => {
    enum Health {
      good = 'OK',
      bad = 'This resource is either not running or not working. Better fix it.',
      busy = 'This resource is busy, please try again later.'
    }
  })
}));

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
