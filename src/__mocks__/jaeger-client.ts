// tslint:disable:no-unused-expression no-any no-unsafe-any
let initTracer = require.requireActual('jaeger-client').initTracer;

initTracer = jest.fn();

export { initTracer };
