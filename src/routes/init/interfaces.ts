
export interface  IURI {
  title: string;
  identifier: string;
  uri: string;
}
export interface ICFDocument {
  identifier: string;
  uri: string;
  creator: string;
  title: string;
  lastChangeDateTime: Date;
  officialSourceURL: string;
  publisher: string;
  description: string;
  subject: string[];
  subjectURI: IURI[];
  language: string;
  version: string;
  adoptionStatus: string;
  statusStartDate: Date;
  statusEndDate: Date;
  licenseURI: IURI;
  notes: string;
  CFPackageURI: string;

}

export interface ICFItem {

  identifier: string;
  CFDocumentURI: string;
  fullStatement: string;
  alternativeLabel: string;
  CFItemType: string;
  uri: string;
  humanCodingScheme: string;
  listEnumeration: string;
  abbreviatedStatement: string;
  conceptKeywords: string[];
  conceptKeywordsURI: IURI;
  notes: string;
  language: string;
  educationLevel: string[];
  CFItemTypeURI: IURI;
  licenseURI: IURI;
  statusStartDate: Date;
  statusEndDate: Date;
  lastChangeDateTime: Date;

}

export interface ICFAssociation {
  identifier: string;
  associationType: string;
  CFDocumentURI: string;
  sequenceNumber: 0;
  uri: string;
  originNodeURI: IURI;
  destinationNodeURI: IURI;
  CFAssociationGroupingURI: IURI;
  lastChangeDateTime: Date;
}

export interface ICFConcept {
  identifier: string;
  uri: string;
  title: string;
  keywords: string;
  hierarchyCode: string;
  description: string;
  lastChangeDateTime: Date;
}

export interface ICFSubject {
  identifier: string;
  uri: string;
  title: string;
  hierarchyCode: string;
  description: string;
  lastChangeDateTime: Date;
}

export interface ICFLicense {
  identifier: string;
  uri: string;
  title: string;
  description: string;
  licenseText: string;
  lastChangeDateTime: Date;
}

export interface ICFItemType {
  identifier: string;
  uri: string;
  title: string;
  description: string;
  hierarchyCode: string;
  typeCode: string;
  lastChangeDateTime: Date;
}

export interface ICFAssociationGrouping {
  identifier: string;
  uri: string;
  title: string;
  description: string;
  lastChangeDateTime: Date;
}

export interface ICFDefinitions {
  CFConcepts: ICFConcept[];
  CFSubjects: ICFSubject[];
  CFLicenses: ICFLicense[];
  CFItemTypes: ICFItemType[];
  CFAssociationGroupings: ICFAssociationGrouping[];
}

export interface ISpecDocument {
  CFDocument: ICFDocument;
  CFItems: ICFItem[];
  CFAssociations: ICFAssociation[];
  CFDefinitions: ICFDefinitions;
}


export interface Claim {
  title: string;
  claimNumber: string;
  grades: string[];
  subject: string;
  description: string;
  shortCode: string;
  domain: string;
  target: [
    {
      title: string;
      shortCode: string;
      description: string;
      standards: [
        string
      ];
      stdDesc: [
        string
      ];
      DOK: [
        string
      ];
      DOKDesc: [
        string
      ];
      shortDOK: [
        string
      ];
      // tslint:disable-next-line
      type: string;
      clarification: string;
      heading: string;
      evidence: [
        string
      ];
      vocab: string;
      tools: string;
      stimInfo: string;
      devNotes: string;
      complexity: string;
      dualText: string;
      accessibility: string;
      stem: [
        string
      ];
      taskDescription: [
        string
      ];
      taskModel: [
        string
      ];
      examples: [
        string
      ];
      rubrics: [
        string
      ];
      stimulus: [
        string
      ];
      shortStem: [
        string
      ];

    }
  ];
}
