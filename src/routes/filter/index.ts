import { Request } from 'express';
import { Health, setRouteHealth } from '../health';
import { CSEResponse } from '../../server';
import { IFilterParams } from '../';
import { applyTracing } from '../../utils/tracer';
import { IFilterOptions } from '../../models/filter';

export const handler = async (req: Request, res: CSEResponse) => {
  const { dbClient } = res.locals;
  const { grades, subject, claimNumber }: IFilterParams = <IFilterParams>req.query;
  let result: IFilterOptions | undefined;
  try {
    await dbClient.connect();
    if (grades && subject && claimNumber) {
      result = await dbClient.getTargetShortCodes(grades, subject, claimNumber);
    } else if (grades && subject) {
      result = await dbClient.getClaimNumbers(grades, subject);
    } else {
      result = await dbClient.getSubjectsAndGrades();
    }
    await dbClient.close();
  } catch (error) {
    res.status(500);
    res.send(error);
  }
  res.status(200);
  res.send(result);
};

export const filter = applyTracing('/filter', handler);
