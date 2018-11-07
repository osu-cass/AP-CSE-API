import { Server } from './server';
import http from 'http';

const server: Server = new Server();

let app: http.Server;

server
  .start()
  .then((application: http.Server) => {
    app = application;
  })
  .catch(err => {
    // tslint:disable-next-line:no-console
    console.error(err);
  });
