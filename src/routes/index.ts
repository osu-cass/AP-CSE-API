import { Router } from 'express';
import { home } from './home';
import { dbInit } from './init';
import { search } from './search';
import { target } from './target';

const router: Router = Router();

router.get('/', home);
router.get('/search', search);
router.get('/target', target);
router.post('/init', dbInit);

export { router };