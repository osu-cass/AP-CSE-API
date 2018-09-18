import { Server } from './server';
import http from 'http';
import { SearchClient } from './search';

const server: Server = new Server();

const client = new SearchClient();

const app: http.Server = server.start();
