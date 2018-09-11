// tslint:disable:no-require-imports no-var-requires no-any no-unsafe-any
const LogstashTransport = require('winston-logstash-transport').LogstashTransport;
const winston = require('winston');

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp()
    ),
    transports: [
        new LogstashTransport({ host: 'logstash', port: 13337 })
    ]
});