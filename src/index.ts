import e, { RequestHandler } from 'express';
import morgan from 'morgan';
import signale from 'signale';
import passport from 'passport';
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';

import { authorize } from './passport';

import { home } from './routes/home';
import { dbInit } from './routes/dbInit';
import { greet } from './routes/greet';

signale.pending('Starting server...');

const app = e();
const port = process.env.PORT as string || 3000 as number;

passport.use(new LocalStrategy(authorize));

app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'short' : 'dev'));
app.use(passport.initialize());

app.get('/', home);
app.post('/init', dbInit);
app.post('/greet', (passport.authenticate('local', { failureRedirect: '/', session: false }) as RequestHandler), greet);

app.listen(port, () => {
  signale.success(`Server ready!`);
  signale.info(`Listening at http://localhost:${port}`);
});