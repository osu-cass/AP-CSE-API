import e from 'express';
import morgan from 'morgan';
import signale from 'signale';
import bodyParser from 'body-parser';

import { generate } from './routes/generate';

signale.pending('Starting server...');

const app = e();
const port = process.env.PORT as string || 3000 as number;

app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'short' : 'dev'));

app.post('/generate', generate);

app.listen(port, () => {
  signale.success(`Server ready!`);
  signale.info(`Make a POST request to http://localhost:${port}/generate`);
});