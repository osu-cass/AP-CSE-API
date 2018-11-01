import {
  IGradeAndSubjectResult,
  IFilterOptions,
  IFilterItem,
  IClaimNumberResult,
  ITargetShortCodeResult,
  IShortCodeResult
} from '../../models/filter';
import { Hash } from '../interface';

function buildSubjectsAndGrades(res: IGradeAndSubjectResult): IFilterOptions {
  const gradeHash: Hash = {};
  let gradeArr: string[] = [];
  let grades: IFilterItem[] = [];
  let subject: IFilterItem[] = [];

  if (res.grades) {
    // flatten
    res.grades.forEach(g => (gradeArr = gradeArr.concat(g)));
    // reduce to distinct members
    grades = gradeArr
      .filter((grade: string) => {
        if (!gradeHash[grade]) {
          gradeHash[grade] = grade;

          return true;
        }

        return false;
      })
      .sort((lhs: string, rhs: string) => parseInt(lhs, 10) - parseInt(rhs, 10))
      .map(g => ({ code: g, label: g }));
  }

  if (res.subject) {
    subject = res.subject.map(s => ({ code: s, label: s }));
  }

  return { subject, grades };
}

function buildClaimNumbers(dbResult: IClaimNumberResult[]): IFilterOptions {
  const claimHash: Hash = {};

  return {
    claimNumbers: dbResult
      .filter(({ claimNumber }: IClaimNumberResult) => {
        if (!claimHash[claimNumber]) {
          claimHash[claimNumber] = claimNumber;

          return true;
        }

        return false;
      })
      .map(({ claimNumber }: IClaimNumberResult) => ({
        code: claimNumber,
        label: claimNumber
      }))
  };
}

function filterShortCodeByGrade(grades: string[], shortCode: string): boolean {
  let included = false;
  for (const grade of grades) {
    included = grade.match(/^[9]|1[0-2]$/)
      ? shortCode.includes('HS')
      : shortCode.includes(`G${grade}`);
    if (included) {
      return included;
    }
  }

  return false;
}

function buildTargetShortCodes(
  grades: string[],
  dbResult: ITargetShortCodeResult[]
): IFilterOptions {
  const flatResult: IShortCodeResult[] = [];
  dbResult.forEach((res: ITargetShortCodeResult) => flatResult.push(...res.target));

  return {
    targetShortCodes: flatResult
      .filter(({ shortCode }: IShortCodeResult) => filterShortCodeByGrade(grades, shortCode))
      .map(({ shortCode }: IShortCodeResult) => ({ code: shortCode, label: shortCode }))
  };
}

export { buildSubjectsAndGrades, buildClaimNumbers, buildTargetShortCodes };
