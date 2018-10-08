import { Router } from 'express';
import { pdfDownload } from './pdf';
import { dbInit } from './init';
import { target } from './target';
import { search } from './search';

export interface ITargetParams {
  subject?: string;
  grades?: string[] | number;
  claimNumber?: string;
  targetShortCode?: string;
}

export interface IQueryParams extends ITargetParams {
  q: string;
}

const router: Router = Router();

router.get('/pdf', pdfDownload);
router.get('/search/:query', search);
router.get('/target/:subject/:grades/:claimNumber/:targetShortCode', target);
router.post('/init', dbInit);

export { router };
