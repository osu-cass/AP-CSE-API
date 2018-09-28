import fetch from 'node-fetch';
import { ISpecDocument } from './interfaces';
import { IClaim } from '../../../models/claim/index';
import { IDOK } from '../../../models/target/index';

// This is required for translating specDocuments to an IClaim type
// tslint:disable:no-unsafe-any no-any

enum Subject { ELA = 'English Language Arts', MATH = 'Math' }
const docs = [
  'smarter_balanced_ela_content_specification',
  'air_deprecated_ela_claims_and_targets',
  'air_deprecated_math_claims_and_targets',
  'ccss_imported_from_digital_library',
  'common_core_state_standards_for_ela',
  'common_core_state_standards_for_mathematics',
  'item_type_response_type',
  'major_vs__additional_supporting__math_',
  'major_vs__additional_supporting__math_',
  'smarter_balanced_math_content_specification',
  'norm_webb_s_depth_of_knowledge__dok__levels_of_cognitive_difficulty'
];

const docArr: ISpecDocument[] = [];
const docNames: string[] = [];
// tslint:disable:max-func-body-length
// This function migrates CASE API documents into a new data model.
export async function importDbEntries(): Promise<IClaim[]> {
  let dokSpec: ISpecDocument;
  let newClaim: any = {};
  const claimArray: IClaim[] = [];
  const arr: ISpecDocument[] = [];
  await importDocs(arr);
  const specs = specDocs();
  const ELASpec: ISpecDocument = specs[0];
  const MATHSpec: ISpecDocument = specs[1];
  const DOKDOC: ISpecDocument = specs[2];

  // TO DO: Implement multi-grade-and-claim document handling
  // This filters out multi-grade-and-claim documents
  arr
    .filter(
      claim => claim.CFDocument.creator !== 'Smarter Balanced_Math Claim 2-4 Item Specifications'
    )
    .forEach((claim, idx) => {
      newClaim = {};
      // this line is necessary for one bug in the CASE API
      if (claim.CFDocument.subject === undefined) {
        newClaim.subject = Subject.ELA;
      } else {
        newClaim.subject = claim.CFDocument.subject[0];
      }
      newClaim.title = claim.CFDocument.title;
      newClaim.grades = [];
      // this handles high-school multi-grades (e.g: 09, 10, 11, 12)
      if (claim.CFItems[0].educationLevel.length > 1) {
        claim.CFItems[0].educationLevel.forEach((edu: string) =>
          newClaim.grades.push(`${parseInt(edu, 10)}`)
        );
      } else {
        newClaim.grades[0] = `${parseInt(claim.CFItems[0].educationLevel[0], 10)}`;
      }
      newClaim.claimNumber = getClaim(newClaim.title, newClaim.subject, newClaim.grades);
      newClaim.target = [{}];
      if (newClaim.title.includes('Performance')) {
        while (newClaim.claimNumber.charAt(0) === 'C') {
          newClaim.claimNumber = newClaim.claimNumber.substr(1);
        }
        newClaim.target[0].type = 'PT';
      }
      newClaim.shortCode = getClaimShortCode(
        newClaim.subject,
        newClaim.claimNumber,
        newClaim.grades
      );
      if (!newClaim.title.includes('Performance')) {
        newClaim.description = getClaimDesc(
          newClaim.subject,
          newClaim.shortCode,
          ELASpec,
          MATHSpec
        );
      }
      if (newClaim.subject !== Subject.MATH) {
        newClaim.domain = getClaimDomain(newClaim.subject, newClaim.shortCode, ELASpec);
      }
      newClaim.target[0].title = claim.CFDocument.title;
      newClaim.target[0].shortCode = claim.CFDocument.notes;
      getTarget(newClaim, claim);
      const catPT = claim.CFDocument.creator.split(' ');
      catPT
        .filter((p: string) => p.includes('CAT'))
        .forEach((p: string) => (newClaim.target[0].type = p));
      if (newClaim.subject === Subject.ELA) {
        dokSpec = ELASpec;
      } else {
        dokSpec = MATHSpec;
      }
      let uriString: string[];
      newClaim.target[0].DOK = [];
      for (const association of dokSpec.CFAssociations) {
        if (association.originNodeURI.title.includes(newClaim.target[0].shortCode)) {
          if (association.destinationNodeURI.uri.includes('DOK')) {
            uriString = association.destinationNodeURI.uri.split('DOK:');
            const uri = uriString[1].replace('%20', '');
            if (newClaim.target[0].DOK.length === 0) {
              newClaim.target[0].DOK.push({
                dokCode: uri
              });
            } else if (!newClaim.target[0].DOK.find((d: IDOK) => d.dokCode.includes(uri))) {
              newClaim.target[0].DOK.push({ dokCode: uri });
            }
          }
        }
      }
      newClaim.target[0].DOK.forEach((d: IDOK) => {
        for (const q of DOKDOC.CFItems) {
          if (q.humanCodingScheme === d.dokCode) {
            d.dokDesc = q.fullStatement;
            d.dokShort = q.abbreviatedStatement;
          }
        }
      });
      claimArray.push(<IClaim>newClaim);
    });

  return consolidate(claimArray);
}
// This function extracts the claim shortcode in Subject.Grade.Claim format from a document's title
export function getClaimShortCode(subject: string, claim: string, grade: string[]) {
  const gradeLevel: string | string[] = parseInt(grade[0], 10) > 8 ? 'HS' : grade;
  if (grade.length > 1) {
    if (parseInt(grade[0], 10) < 9) {
      return subject === Subject.ELA
        ? `E.G${grade[0]}-${grade[grade.length - 1]}.${claim}`
        : `M.G${grade[0]}-${grade[grade.length - 1]}.${claim}`;
    }
  }

  return subject === Subject.ELA ? `E.G${gradeLevel}.${claim}` : `M.G${gradeLevel}.${claim}`;
}

// This function extracts the claim number from a document's title in CX format (e.g C1, C2, C3)
// See Data Structure docs for info on the differences between document titles
export function getClaim(title: string, subject: string, grades: string[]) {
  let titlecopy = ` ${title}`.slice(1);
  let titlearray = [];
  if (subject === Subject.ELA) {
    if (!title.includes('Performance')) {
      titlearray = titlecopy.split(' ');

      return `C${titlearray[7]}`;
    }
    titlecopy = titlecopy.replace('English Language Arts Performance Task Specification: ', '');
    titlecopy = titlecopy.replace('Grade ', '');

    titlecopy = titlecopy.replace(grades[0], '');
    titlecopy = titlecopy.replace(' ', '');

    return `C${titlecopy}`;
  }
  titlearray = titlecopy.split(' ');
  if (title.includes('Grade ')) {
    return titlearray[5];
  }
  if (title.includes('Grades ')) {
    return `C${titlearray[4]}`;
  }
  if (title.includes('Mathematics ')) {
    return titlearray[4];
  }

  return `C${titlearray[4]}`;
}

export async function importDocs(arr: ISpecDocument[]) {
  const packages: string[] = await fetchAllDocs();
  for (const pack of packages) {
    // tslint:disable-next-line
    // console.log(((i / packages.length) * 100).toPrecision(3) + '%');
    const data = await fetch(`https://case.smarterbalanced.org/ims/case/v1p0/CFPackages/${pack}`);
    const jsonData: ISpecDocument = await data.json();
    const title: string = jsonData.CFDocument.title;
    const filename: string = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (!docs.includes(filename)) {
      arr.push(jsonData);
    } else {
      docNames.push(filename);
      docArr.push(jsonData);
    }
  }

  return packages.length;
}

export async function fetchAllDocs() {
  const p: string[] = [];
  const temp = await fetch(
    'https://case.smarterbalanced.org/ims/case/v1p0/CFDocuments?limit=99999999999&offset=0&sort&orderBy&filter&fields'
  );
  const idDoc = await temp.json();
  // for (let j = 0; j < idDoc.CFDocuments.length; j++) {
  for (const j of idDoc.CFDocuments) {
    p.push(j.identifier);
  }

  return p;
}

export function specDocs() {
  const specs: ISpecDocument[] = [];
  for (let i = 0; i < docNames.length; i++) {
    if (docNames[i].includes('smarter_balanced_ela_content_specification')) {
      specs[0] = docArr[i];
    } else if (docNames[i].includes('smarter_balanced_math_content_specification')) {
      specs[1] = docArr[i];
    } else if (
      docNames[i].includes('norm_webb_s_depth_of_knowledge__dok__levels_of_cognitive_difficulty')
    ) {
      specs[2] = docArr[i];
    }
  }

  return specs;
}
// This function extracts target-specific data for a given document
export function getTarget(claim: IClaim, jsonData: ISpecDocument) {
  let iter = 0;
  claim.target[0].taskModels = [];
  claim.target[0].stem = [];
  claim.target[0].standards = [];
  claim.target[0].evidence = [];
  claim.target[0].rubrics = [];
  for (const p of jsonData.CFItems) {
    const { fullStatement, humanCodingScheme, abbreviatedStatement } = p;
    if (p.CFItemType === 'Target') {
      claim.target[0].description = fullStatement;
      claim.target[0].shortCode = humanCodingScheme;
    }
    if (p.CFItemType === 'Measured Skill') {
      if (!claim.target[0].standards.find(s => s.stdCode === humanCodingScheme)) {
        claim.target[0].standards.push({
          stdCode: humanCodingScheme,
          stdDesc: fullStatement
        });
      }
    }
    if (p.CFItemType === 'Clarification') {
      claim.target[0].clarification = fullStatement;
    }
    if (p.CFItemType === 'Section Heading') {
      claim.target[0].heading = fullStatement;
    }
    if (p.CFItemType === 'Evidence Required') {
      const splitStatement = fullStatement.split(' ');
      if (splitStatement.length > 2) {
        claim.target[0].evidence.push(fullStatement);
      }
    }
    if (p.CFItemType === 'Accessibility') {
      claim.target[0].accessibility = fullStatement;
    }
    if (p.CFItemType === 'Task Description') {
      claim.target[0].taskModels.push({
        taskDesc: fullStatement,
        taskName: jsonData.CFItems[iter + 1].fullStatement,
        stimulus: jsonData.CFItems[iter + 2].fullStatement,
        examples: jsonData.CFItems[iter + 4].fullStatement
      });
    }
    if (p.CFItemType === 'Stem') {
      claim.target[0].stem.push({
        stemDesc: fullStatement,
        shortStem: abbreviatedStatement
      });
    }
    if (p.CFItemType === 'Rubric') {
      if (fullStatement !== 'NA') {
        claim.target[0].rubrics.push(fullStatement);
      }
    }
    iter++;
  }
  getGenReqs(claim, jsonData);
}
// This function extracts the target properties that are found under the "General Requirements" itemtypes in a given document
export function getGenReqs(claim: IClaim, jsonData: ISpecDocument) {
  for (const p of jsonData.CFItems) {
    if (p.CFItemType === 'General Requirements') {
      if (p.abbreviatedStatement === 'Key/Construct Relevant Vocabulary') {
        claim.target[0].vocab = p.fullStatement;
      }
      if (p.abbreviatedStatement === 'Allowable Tools') {
        claim.target[0].tools = p.fullStatement;
      }
      if (p.abbreviatedStatement === 'Stimuli/Passages') {
        claim.target[0].stimInfo = p.fullStatement;
      }
      if (p.abbreviatedStatement === 'Stimuli/Text Complexity') {
        claim.target[0].complexity = p.fullStatement;
      }
      if (p.abbreviatedStatement === 'Development Notes') {
        claim.target[0].devNotes = p.fullStatement;
      }
      if (p.abbreviatedStatement === 'Dual-Text Stimuli') {
        claim.target[0].dualText = p.fullStatement;
      }
    }
  }
}
// This function returns the domain for a given ELA document.
function getClaimDomain(
  subject: string,
  shortCode: string,
  ELASpec: ISpecDocument
): string | undefined {
  for (let i = 0; i < ELASpec.CFItems.length; i++) {
    if (ELASpec.CFItems[i].humanCodingScheme === shortCode) {
      if (ELASpec.CFItems[i + 1].CFItemType === 'Domain') {
        return ELASpec.CFItems[i + 1].fullStatement;
      }
    }
  }

  return undefined;
}

// This function returns the description for a given claim
function getClaimDesc(
  subject: string,
  shortCode: string,
  ELASpec: ISpecDocument,
  MATHSpec: ISpecDocument
): string | undefined {
  const jsData: ISpecDocument = subject === Subject.ELA ? ELASpec : MATHSpec;
  for (const i of jsData.CFItems) {
    if (i.humanCodingScheme === shortCode) {
      return i.fullStatement;
    }
  }
}
// This function consolidates all targets that share the same claim number into a singular claim object with an array of targets.
export function consolidate(claimArray: IClaim[]): IClaim[] {
  for (const p of claimArray) {
    for (const q of claimArray) {
      if (q.shortCode === p.shortCode && q !== p && q.grades.length === 1) {
        p.target.push(q.target[0]);
        claimArray.splice(claimArray.indexOf(q), 1);
      }
    }
  }
  for (const p of claimArray) {
    if (p.subject === Subject.ELA) {
      if (!p.title.includes('Performance')) {
        const titlecopy = p.title.split(' ');
        p.title = titlecopy.slice(0, 8).join(' ');
      }
    } else {
      const titlecopy = p.title.split(' ');
      if (titlecopy.includes('Grade')) {
        p.title = titlecopy.slice(0, 6).join(' ');
      } else if (titlecopy[0] === 'HS') {
        p.title = titlecopy.slice(0, 5).join(' ');
      }
    }
  }

  return claimArray;
}
