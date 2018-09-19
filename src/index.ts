import { Server } from './server';
import http from 'http';
import { SearchClient } from './dal/search';

const server: Server = new Server();

const app: http.Server = server.start();
