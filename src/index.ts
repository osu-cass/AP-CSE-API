import { Server } from './server';
import http from 'http';

const server: Server = new Server();

const app: http.Server = server.start();
