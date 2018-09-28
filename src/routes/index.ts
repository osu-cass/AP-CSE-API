import { Router } from 'express';
import { pdfDownload } from './pdf';
import { dbInit } from './init';
import { search } from './search';
import { target } from './target';

const router: Router = Router();

router.get('/pdf', pdfDownload);
router.get('/search/:query', search);
router.get('/target/:subject/:grades/:claimNumber/:targetShortCode', target);
router.post('/init', dbInit);

export { router };
