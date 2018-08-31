import { Router, RequestHandler } from 'express';
import { home } from './home';
import { greet } from './greet';
import passport from 'passport';

const router = Router();

router.get('/', home);
router.post('/greet', (passport.authenticate('local', { failureRedirect: '/', session: false }) as RequestHandler), greet);

export { router };
