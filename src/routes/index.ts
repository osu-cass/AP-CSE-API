import { Router } from 'express';
import { dbInit } from './init';
import { target } from './target';
import { search } from './search';
import { filter } from './filter';

export interface ITargetShortCode {
  targetShortCode: string;
}
export interface ITargetParams {
  subject?: string;
  grades?: string[] | number;
  claimNumber?: string;
  targetShortCode?: string;
}

export interface IFilterParams {
  subject?: string;
  grades?: string;
  claimNumber?: string;
}

export interface IQueryParams extends ITargetParams {
  query?: string;
}

const router: Router = Router();

router.get('/search/', search);
router.get('/filter/', filter);
router.get('/target/:targetShortCode', target);
router.post('/init', dbInit);

export { router };
