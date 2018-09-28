// tslint:disable:no-require-imports no-var-requires no-any no-unsafe-any
const LogstashTransport = require('winston-logstash-transport').LogstashTransport;
import { createLogger, Logger, transports } from 'winston';

const consoleOpts = {
  level: 'debug',
  handleExceptions: true,
  json: true,
  colorize: true
};

const logger: Logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console(consoleOpts),
    new LogstashTransport({ host: '0.0.0.0', port: 13337 })
  ],
  exitOnError: false
});

/**
 * Represents a stream that a logging serive can use to write to
 * both transports in the logger
 */
class LoggingStream {
  write(message: string) {
    logger.info(message);
  }
}

export { logger, LoggingStream };
