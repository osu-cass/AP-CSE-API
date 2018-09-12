// tslint:disable:no-unused-expression no-any no-unsafe-any
let initTracer = require.requireActual('jaeger-client').inittracer;

initTracer = jest.fn();

export { initTracer };