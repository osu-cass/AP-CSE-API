import { Router } from 'express';
import { home } from './home';
import { greet } from './greet';
import { dbInit } from './dbInit';
import { search } from './search';
import { filter } from './filter';

const router: Router = Router();

router.get('/', home);
router.get('/search', search);
router.get('/filter', filter);
router.post('/greet', greet);
router.post('/init', dbInit);

export { router };