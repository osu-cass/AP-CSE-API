import { logger, LoggingStream } from '.';
import { Logger } from 'winston';

describe('logger', () => {
    let testLogger: Logger;

    beforeAll(() => {
        testLogger = logger;
        testLogger.info = jest.fn();
    });

    describe('LoggingStream', () => {
        let stream: LoggingStream;
        let testValue: string;

        beforeAll(() => {
            stream = new LoggingStream();
            testValue = 'test';
        });

        it('calls write', () => {
            stream.write(testValue);
            expect.assertions(1);
            expect(testLogger.info).toHaveBeenCalledWith(testValue);
        });
    });

});