export interface SpecDocument {

        CFDocument: {
          identifier: string;
          uri: string;
          creator: string;
          title: string;
          lastChangeDateTime: Date;
          officialSourceURL: string;
          publisher: string;
          description: string;
          subject: [
            string
          ];
          subjectURI: [
            {
              title: string;
              identifier: string;
              uri: string;
            }
          ];
          language: string;
          version: string;
          adoptionStatus: string;
          statusStartDate: Date;
          statusEndDate: Date;
          licenseURI: {
            title: string;
            identifier: string;
            uri: string;
          };
          notes: string;
          CFPackageURI: string;
        };
        CFItems: [
          {
            identifier: string;
            CFDocumentURI: string;
            fullStatement: string;
            alternativeLabel: string;
            CFItemType: string;
            uri: string;
            humanCodingScheme: string;
            listEnumeration: string;
            abbreviatedStatement: string;
            conceptKeywords: [
              string
            ];
            conceptKeywordsURI: {
              title: string;
              identifier: string;
              uri: string;
            };
            notes: string;
            language: string;
            educationLevel: [
              string
            ];
            CFItemTypeURI: {
              title: string;
              identifier: string;
              uri: string;
            };
            licenseURI: {
              title: string;
              identifier: string;
              uri: string;
            };
            statusStartDate: Date;
            statusEndDate: Date;
            lastChangeDateTime: Date;
          }
        ];
        CFAssociations: [
          {
            identifier: string;
            associationType: string;
            CFDocumentURI: string;
            sequenceNumber: 0;
            uri: string;
            originNodeURI: {
              title: string;
              identifier: string;
              uri: string;
            };
            destinationNodeURI: {
              title: string;
              identifier: string;
              uri: string;
            };
            CFAssociationGroupingURI: {
              title: string;
              identifier: string;
              uri: string;
            };
            lastChangeDateTime: Date;
          }
        ];
        CFDefinitions: {
          CFConcepts: [
            {
              identifier: string;
              uri: string;
              title: string;
              keywords: string;
              hierarchyCode: string;
              description: string;
              lastChangeDateTime: Date;
            }
          ];
          CFSubjects: [
            {
              identifier: string;
              uri: string;
              title: string;
              hierarchyCode: string;
              description: string;
              lastChangeDateTime: Date;
            }
          ];
          CFLicenses: [
            {
              identifier: string;
              uri: string;
              title: string;
              description: string;
              licenseText: string;
              lastChangeDateTime: Date;
            }
          ];
          CFItemTypes: [
            {
              identifier: string;
              uri: string;
              title: string;
              description: string;
              hierarchyCode: string;
              typeCode: string;
              lastChangeDateTime: Date;
            }
          ];
          CFAssociationGroupings: [
            {
              identifier: string;
              uri: string;
              title: string;
              description: string;
              lastChangeDateTime: Date;
            }
          ];
        };
        CFRubrics: [
          {
            identifier: string;
            uri: string;
            title: string;
            description: string;
            lastChangeDateTime: Date;
            CFRubricCriteria: [
              {
                identifier: string;
                uri: string;
                category: string;
                description: string;
                CFItemURI: string;
                weight: number;
                position: number;
                rubricId: string;
                lastChangeDateTime: Date;
                CFRubricCriterionLevels: [
                  {
                    identifier: string;
                    uri: string;
                    description: string;
                    quality: string;
                    score: number;
                    feedback: string;
                    position: number;
                    rubricCriterionId: string;
                    lastChangeDateTime: Date;
                  }
                ];
              }
            ];
          }
        ];
      }

      export const blankSpec: SpecDocument = {
        CFDocument: {
          identifier: 'blankDoc',
          uri :  'blankDoc',
          creator :  'blankDoc',
          title :  'blankDoc',
          lastChangeDateTime :  new Date(1),
          officialSourceURL :  'blankDoc',
          publisher :  'blankDoc',
          description :  'blankDoc',
          subject :  [
            'blankDoc'
          ],
          subjectURI :  [
            {
              title :  'blankDoc',
              identifier :  'blankDoc',
              uri :  'blankDoc',
            }
          ],
          language :  'blankDoc',
          version :  'blankDoc',
          adoptionStatus :  'blankDoc',
          statusStartDate :  new Date(1),
          statusEndDate :  new Date(1),
          licenseURI :  {
            title :  'blankDoc',
            identifier :  'blankDoc',
            uri :  'blankDoc',
          },
          notes :  'blankDoc',
          CFPackageURI :  'blankDoc',
        },
        CFItems :  [
          {
            identifier :  'blankDoc',
            CFDocumentURI :  'blankDoc',
            fullStatement :  'blankDoc',
            alternativeLabel :  'blankDoc',
            CFItemType :  'blankDoc',
            uri :  'blankDoc',
            humanCodingScheme :  'blankDoc',
            listEnumeration :  'blankDoc',
            abbreviatedStatement :  'blankDoc',
            conceptKeywords :  [
              'blankDoc'
            ],
            conceptKeywordsURI :  {
              title :  'blankDoc',
              identifier :  'blankDoc',
              uri :  'blankDoc',
            },
            notes :  'blankDoc',
            language :  'blankDoc',
            educationLevel :  [
              'blankDoc'
            ],
            CFItemTypeURI :  {
              title :  'blankDoc',
              identifier :  'blankDoc',
              uri :  'blankDoc',
            },
            licenseURI :  {
              title :  'blankDoc',
              identifier :  'blankDoc',
              uri :  'blankDoc',
            },
            statusStartDate :  new Date(1),
            statusEndDate :  new Date(1),
            lastChangeDateTime :  new Date(1),
          }
        ],
        CFAssociations :  [
          {
            identifier :  'blankDoc',
            associationType :  'blankDoc',
            CFDocumentURI :  'blankDoc',
            sequenceNumber :  0,
            uri :  'blankDoc',
            originNodeURI :  {
              title :  'blankDoc',
              identifier :  'blankDoc',
              uri :  'blankDoc',
            },
            destinationNodeURI :  {
              title :  'blankDoc',
              identifier :  'blankDoc',
              uri :  'blankDoc',
            },
            CFAssociationGroupingURI :  {
              title :  'blankDoc',
              identifier :  'blankDoc',
              uri :  'blankDoc',
            },
            lastChangeDateTime :  new Date(1),
          }
        ],
        CFDefinitions :  {
          CFConcepts :  [
            {
              identifier :  'blankDoc',
              uri :  'blankDoc',
              title :  'blankDoc',
              keywords :  'blankDoc',
              hierarchyCode :  'blankDoc',
              description :  'blankDoc',
              lastChangeDateTime :  new Date(1),
            }
          ],
          CFSubjects :  [
            {
              identifier :  'blankDoc',
              uri :  'blankDoc',
              title :  'blankDoc',
              hierarchyCode :  'blankDoc',
              description :  'blankDoc',
              lastChangeDateTime :  new Date(1),
            }
          ],
          CFLicenses :  [
            {
              identifier :  'blankDoc',
              uri :  'blankDoc',
              title :  'blankDoc',
              description :  'blankDoc',
              licenseText :  'blankDoc',
              lastChangeDateTime :  new Date(1),
            }
          ],
          CFItemTypes :  [
            {
              identifier :  'blankDoc',
              uri :  'blankDoc',
              title :  'blankDoc',
              description :  'blankDoc',
              hierarchyCode :  'blankDoc',
              typeCode :  'blankDoc',
              lastChangeDateTime :  new Date(1),
            }
          ],
          CFAssociationGroupings :  [
            {
              identifier :  'blankDoc',
              uri :  'blankDoc',
              title :  'blankDoc',
              description :  'blankDoc',
              lastChangeDateTime :  new Date(1),
            }
          ],
        },
        CFRubrics :  [
          {
            identifier :  'blankDoc',
            uri :  'blankDoc',
            title :  'blankDoc',
            description :  'blankDoc',
            lastChangeDateTime :  new Date(1),
            CFRubricCriteria :  [
              {
                identifier :  'blankDoc',
                uri :  'blankDoc',
                category :  'blankDoc',
                description :  'blankDoc',
                CFItemURI :  'blankDoc',
                weight :  0,
                position :  0,
                rubricId :  'blankDoc',
                lastChangeDateTime :  new Date(1),
                CFRubricCriterionLevels :  [
                  {
                    identifier :  'blankDoc',
                    uri :  'blankDoc',
                    description :  'blankDoc',
                    quality :  'blankDoc',
                    score :  0,
                    feedback :  'blankDoc',
                    position :  0,
                    rubricCriterionId :  'blankDoc',
                    lastChangeDateTime :  new Date(1),
                  }
                ],
              }
            ],
          }
        ],
      };
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

export const blankClaim: Claim = {
    title: 'string',
    claimNumber: 'string',
    grades: ['string'],
    subject: 'string',
    description: 'string',
    shortCode: 'string',
    domain: 'string',
    target: [
        {
            title: 'string',
            shortCode: 'string',
            description: 'string',
            standards: [
                'string'
            ],
            stdDesc: [
                'string'
            ],
            DOK: [
                'string'
            ],
            DOKDesc: [
                'string'
            ],
            shortDOK: [
                'string'
            ],
            type: 'string',
            clarification: 'string',
            heading: 'string',
            evidence: [
                'string'
            ],
            vocab: 'string',
            tools: 'string',
            stimInfo: 'string',
            devNotes: 'string',
            complexity: 'string',
            dualText: 'string',
            accessibility: 'string',
            stem: [
                'string'
            ],
            taskDescription: [
                'string'
            ],
            taskModel: [
                'string'
            ],
            examples: [
                'string'
            ],
            rubrics: [
                'string'
            ],
            stimulus: [
                'string'
            ],
            shortStem: [
                'string'
            ],

        }
    ]
};

export interface NewClaim {
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
              {
                  stdCode: string;
                  stdDesc: string;
              }
          ];
          DOK: [
              {
                  dokCode: string;
                  dokDesc: string;
                  dokShort: string;
              }
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
              {
                  stemDesc: string;
                  shortStem: string;
              }
          ];
          taskModels: [
              {
                  taskName: string;
                  taskDesc: string;
                  examples: string;
                  rubrics: [string];
                  stimulus: string;
              }
          ];


      }
  ];

}

export const blankNewClaim: NewClaim = {
  title: 'string',
    claimNumber: 'string',
    grades: ['string'],
    subject: 'string',
    description: 'string',
    shortCode: 'string',
    domain: 'string',
    target: [
        {
            title: 'string',
            shortCode: 'string',
            description: 'string',
            standards: [
                {
                    stdCode: 'string',
                    stdDesc: 'string'
                }
            ],
            DOK: [
                {
                    dokCode: 'string',
                    dokDesc: 'string',
                    dokShort: 'string'
                }
            ],
            type: 'string',
            clarification: 'string',
            heading: 'string',
            evidence: [
                'string'
            ],
            vocab: 'string',
            tools: 'string',
            stimInfo: 'string',
            devNotes: 'string',
            complexity: 'string',
            dualText: 'string',
            accessibility: 'string',
            stem: [
                {
                    stemDesc: 'string',
                    shortStem: 'string'
                }
            ],
            taskModels: [
                {
                    taskName: 'string',
                    taskDesc: 'string',
                    examples: 'string',
                    rubrics: ['string'],
                    stimulus: 'string'
                }
            ],


        }
    ]
};