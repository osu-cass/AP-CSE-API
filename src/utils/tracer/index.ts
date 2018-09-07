// tslint:disable:no-require-imports no-var-requires no-any no-unsafe-any
import { logger } from '../logger';
import { Tracer } from 'opentracing';
const initTracer: (config: object, options: object) => Tracer = require('jaeger-client').initTracer;

export const createTracer: () => Tracer = () => {
    const config: any = {
        serviceName: 'cse-api',
        reporter: {
            collectorEndpoint: 'http://jaeger-collector:14268/api/traces'
        }
    };
    const options: any = {
        logger,
        tags: {
            'cse-api': '0.0.0'
        }
    };

    return initTracer(config, options);
};

