import e from 'express';
import { use, listen } from '../__mocks__/express';
import { Server} from './';

describe('Server', () => {
    let server: Server;
    const routesSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'routes');
    const configureSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'configure');
    const registerMiddlewareSpy: jest.SpyInstance = jest.spyOn(Server.prototype, 'registerMiddleware');

    beforeAll(() => {
        server = new Server();
    });

    afterEach(() => {
        use.mockClear();
    });

    it('initializes correctly', () => {
        expect.assertions(4);
        expect(routesSpy).toHaveBeenCalledTimes(1);
        expect(configureSpy).toHaveBeenCalledTimes(1);
        expect(registerMiddlewareSpy).toHaveBeenCalledTimes(1);
        expect(use).toHaveBeenCalledTimes(4);
    });

    it('returns an http.Server instance', () => {
        expect.assertions(2);
        server.start();
        expect(e).toHaveBeenCalledTimes(1);
        expect(listen).toHaveBeenCalledTimes(1);
    });

    it('it configures the server', () => {
        server.configure();
        expect.assertions(1);
        expect(use).toHaveBeenCalledTimes(2);
    });
});