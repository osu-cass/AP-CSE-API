// tslint:disable:no-require-imports no-var-requires no-any no-unsafe-any
const LogstashTransport = require('winston-logstash-transport').LogstashTransport;
import { createLogger, Logger, transports } from 'winston';

const consoleOpts = {
  level: 'debug',
  handleExceptions: true,
  json: true,
  colorize: true
};

const { LOGSTASH_HOSTNAME: host = 'logstash', LOGSTASH_PORT: port = '13337' } = process.env;

const logger: Logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console(consoleOpts),
    new LogstashTransport({ host, port: parseInt(port, 10) })
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
