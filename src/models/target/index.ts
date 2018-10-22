export interface ITaskModel {
  taskName: string;
  taskDesc?: string;
  examples?: string | string[];
  stimulus?: string;
  relatedEvidence?: string[];
}

export interface IStem {
  stemDesc: string;
  shortStem: string;
}

export interface IDOK {
  dokCode: string;
  dokDesc: string;
  dokShort: string;
}

export interface IStandards {
  stdCode: string;
  stdDesc: string;
}

export interface IEvidence {
  evTitle: string;
  evDesc: string;
}
export interface ITarget {
  title: string;
  shortCode: string;
  description: string;
  standards: IStandards[];
  DOK: IDOK[];
  interactionType: string;
  clarification: string;
  heading: string;
  evidence: IEvidence[];
  vocab: string;
  tools: string;
  stimInfo: string;
  devNotes: string;
  complexity: string;
  dualText: string;
  accessibility: string;
  stem: IStem[];
  taskModels: ITaskModel[];
  rubrics: string[];
}
