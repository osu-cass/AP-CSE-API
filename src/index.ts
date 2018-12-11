import { Server } from './server';
import http from 'http';
import signale from 'signale';

const server = new Server()
  .start()
  .then((application: http.Server) => application)
  .catch(err => {
    signale.fatal(err);
  });
