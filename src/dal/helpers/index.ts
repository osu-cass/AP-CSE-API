import {
  IGradeAndSubjectResult,
  IFilterOptions,
  IFilterItem,
  IClaimNumberResult,
  ITargetShortCodeResult,
  IShortCodeResult
} from '../../models/filter';
import { Hash } from '../../utils/static';

/**
 * Helper function to filter out high school grades(9, 10, 11, 12)
 * and confirm that all other grades are included only once.
 * @param hash
 * @param idx
 */
function filterValue(hash: Hash, idx: string): boolean {
  if (!hash[idx] && !idx.match(/^[9]|1[0-2]$/)) {
    hash[idx] = idx;

    return true;
  }

  return false;
}

export function buildSubjectsAndGrades(res: IGradeAndSubjectResult): IFilterOptions | undefined {
  const gradeHash: Hash = {};
  let gradeArr: string[] = [];
  let grades: IFilterItem[] = [];
  let subject: IFilterItem[] = [];

  if (res.grades) {
    res.grades.forEach(g => (gradeArr = gradeArr.concat(g)));
    grades = gradeArr
      .filter((grade: string) => filterValue(gradeHash, grade))
      .sort((lhs: string, rhs: string) => parseInt(lhs, 10) - parseInt(rhs, 10))
      .map(g => ({ code: g, label: `Grade ${g}` }));
    grades.push({ code: '9,10,11,12', label: 'High School' });
  }

  if (res.subject) {
    subject = res.subject.map(s => ({ code: s, label: s }));
  }

  return subject.length !== 0 && grades.length !== 0 ? { subject, grades } : undefined;
}

export function buildClaimNumbers(dbResult: IClaimNumberResult[]): IFilterOptions | undefined {
  const claimNums: Hash = {};

  const claimNumbers: IFilterItem[] = dbResult
    .filter(({ claimNumber }: IClaimNumberResult) => filterValue(claimNums, claimNumber))
    .map(({ claimNumber }: IClaimNumberResult) => ({ code: claimNumber, label: claimNumber }));

  return claimNumbers.length !== 0 ? { claimNumbers } : undefined;
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

function translateTargetShortCode(code: string): string {
  let display: string;
  // get the target number/letter
  const target: string = code[code.length - 1];
  // split the target short code over '.'
  const codeSegment: string[] = code.split('.');
  // get the domain/sub-claim for special case (Math 3, C1)
  const domain: string = codeSegment[2].substring(2);

  // Only include the domain string if the subject is math
  if(codeSegment[0] === 'M') {
    display = domain === '' ? `Target ${target}` : `Target ${target} (${domain})`;
  } else {
    display = `Target ${target}`;
  }

  return display;
}

export function buildTargetShortCodes(
  grades: string[],
  dbResult: ITargetShortCodeResult[]
): IFilterOptions | undefined {
  const flatResult: IShortCodeResult[] = [];
  dbResult.forEach((res: ITargetShortCodeResult) => flatResult.push(...res.target));

  const targetShortCodes: IFilterItem[] = flatResult
    .filter(({ shortCode }: IShortCodeResult) => filterShortCodeByGrade(grades, shortCode))
    .map(({ shortCode }: IShortCodeResult) => ({ code: shortCode, label: translateTargetShortCode(shortCode) }));

  return targetShortCodes.length !== 0 ? { targetShortCodes } : undefined;
}
