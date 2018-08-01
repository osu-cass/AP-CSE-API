import e from 'express';
import signale from 'signale';

import { generate } from './routes/generate';

signale.pending('Starting server...');

const app = e();
const port = process.env.PORT as string || 3000 as number;

app.post('/generate', generate);

app.listen(port, () => {
  signale.success(`Server ready!`);
  signale.info(`Make a POST request to http://localhost:${port}/generate`);
});