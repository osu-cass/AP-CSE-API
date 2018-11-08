import { Server } from './server';
import http from 'http';
import signale from 'signale';

const server: Server = new Server();

let app: http.Server;

server
  .start()
  .then((application: http.Server) => {
    app = application;
  })
  .catch(err => {
    signale.fatal(err);
  });
