import express from 'express';
import { use, listen, get, post} from '../../__mocks__/express';
import passport from 'passport';
import { home, greet, dbInit } from '../routes';
import { Server } from './';

jest.mock('passport');

describe('Server', () => {
    let server: Server;
    const routesSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'routes');
    const configureSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'configure');
    const authenticateSpy: jest.SpyInstance = jest.spyOn(passport, 'authenticate');
    const passportUseSpy: jest.SpyInstance = jest.spyOn(passport, 'use');

    beforeAll(() => {
        server = new Server();
    });

    it('initializes and configures correctly', () => {
        expect.assertions(7);
        expect(routesSpy).toHaveBeenCalledTimes(1);
        expect(configureSpy).toHaveBeenCalledTimes(1);
        expect(passportUseSpy).toHaveBeenCalledTimes(1);
        expect(use).toHaveBeenCalledTimes(3);
        expect(get).toHaveBeenCalledWith('/', home);
        expect(post.mock.calls[0]).toEqual(['/greet', server.authenticate, greet]);
        expect(post.mock.calls[1]).toEqual(['/init', dbInit]);
    });

    it('returns an http.Server instance', () => {
        expect.assertions(2);
        const app = server.start();
        expect(express).toHaveBeenCalledTimes(1);
        expect(listen).toHaveBeenCalledTimes(1);
    });

    it('authenticates the user', () => {
        expect.assertions(1);
        server.authenticate();
        expect(authenticateSpy).toHaveBeenCalledWith('local', { failureRedirect: '/', session: false });
    });
});