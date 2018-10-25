export interface IGradeAndSubjectResult {
  grades: string[][];
  subject: string[];
}

export interface IClaimNumberResult {
  claimNumber: string;
}

export interface IShortCodeResult {
  shortCode: string;
}

export interface ITargetShortCodeResult {
  target: IShortCodeResult[];
}

export interface IFilterItem {
  code: string;
  label: string;
}

export interface IFilterOptions {
  grades?: IFilterItem[];
  subject?: IFilterItem[];
  claimNumbers?: IFilterItem[];
  targetShortCodes?: IFilterItem[];
}
