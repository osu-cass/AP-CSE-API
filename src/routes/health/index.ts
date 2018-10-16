import { Request } from 'express';
import { router } from '../index';
import { CSEResponse } from '../../server/index';
import { applyTracing } from '../../utils/tracer/index';

export enum Health {
  good = 'OK',
  bad = 'This resource is either not running or not working. Better fix it.',
  busy = 'This resource is busy, please try again later.'
}

// This is required because the express router stack is of type any[]
// tslint:disable:no-unsafe-any
export function setRouteHealth(status: Health, req: Request) {
  router.stack.forEach(endpoint => {
    if (endpoint.route.path === req.path) {
      endpoint.routeHealth = status;
    }
  });
}

export async function handler(req: Request, res: CSEResponse) {
  const status = [];
  for (const endpoints of router.stack) {
    if (endpoints.route.path.includes('/search/')) {
      status.push({
        route: '/search/',
        status: await res.locals.searchClient.ping()
      });
    } else if (endpoints.route.path.includes('/target/')) {
      status.push({
        route: '/target/',
        status: await res.locals.dbClient.ping()
      });
    } else {
      status.push({
        route: endpoints.route.path,
        status: `${endpoints.routeHealth}`
      });
    }
  }
  res.status(200);
  res.send({ Health: status });
}
export const healthCheck = applyTracing('/health', handler);
