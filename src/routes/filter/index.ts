import { Request } from 'express';
import { IFilterParams } from '../';
import { applyTracing } from '../../utils/tracer';
import { IFilterOptions } from '../../models/filter';
import { CSEResponse } from '../../server';

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
    result ? res.status(200) : res.sendStatus(500);
    await dbClient.close();
  } catch (error) {
    res.sendStatus(500);
  }
  res.send(result);
};

export const filter = applyTracing('/filter', handler);
