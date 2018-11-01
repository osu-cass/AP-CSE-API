import {
  IGradeAndSubjectResult,
  IFilterOptions,
  IFilterItem,
  IClaimNumberResult,
  ITargetShortCodeResult,
  IShortCodeResult
} from '../../models/filter';
import { Hash } from '../interface';

function filterSubjects(grades: Hash, grade: string): boolean {
  if (!grades[grade]) {
    grades[grade] = grade;

    return true;
  }

  return false;
}

export function buildSubjectsAndGrades(res: IGradeAndSubjectResult): IFilterOptions {
  const gradeHash: Hash = {};
  let gradeArr: string[] = [];
  let grades: IFilterItem[] = [];
  let subject: IFilterItem[] = [];

  if (res.grades) {
    res.grades.forEach(g => (gradeArr = gradeArr.concat(g)));
    grades = gradeArr
      .filter((grade: string) => filterSubjects(gradeHash, grade))
      .sort((lhs: string, rhs: string) => parseInt(lhs, 10) - parseInt(rhs, 10))
      .map(g => ({ code: g, label: g }));
  }

  if (res.subject) {
    subject = res.subject.map(s => ({ code: s, label: s }));
  }

  return { subject, grades };
}

function filterClaimNumbers(claimNumbers: Hash, claimNumber: string): boolean {
  if (!claimNumbers[claimNumber]) {
    claimNumbers[claimNumber] = claimNumber;

    return true;
  }

  return false;
}

export function buildClaimNumbers(dbResult: IClaimNumberResult[]): IFilterOptions {
  const claimNumbers: Hash = {};

  return {
    claimNumbers: dbResult
      .filter(({ claimNumber }: IClaimNumberResult) => filterClaimNumbers(claimNumbers, claimNumber))
      .map(({ claimNumber }: IClaimNumberResult) => ({code: claimNumber, label: claimNumber}))
  };
}

function filterShortCodeByGrade(grades: string[], shortCode: string): boolean {
  let included = false;
  for (const grade of grades) {
    included = grade.match(/^[9]|1[0-2]$/)
      ? shortCode.includes('HS')
      : shortCode.includes(`G${grade}`);
    if (included) {
      return true;
    }
  }

  return false;
}

export function buildTargetShortCodes(
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

