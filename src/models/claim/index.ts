import { ITarget } from '../target';

export interface IClaim {
  title: string;
  claimNumber: string;
  grades: string[];
  subject: string;
  description?: string;
  shortCode: string;
  domain?: string | IDomain[];
  target: ITarget[];
}

export interface IDomain {
  title: string;
  desc?: string;
}
