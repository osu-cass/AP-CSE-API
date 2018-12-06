import fetch from 'node-fetch';
import { ISpecDocument } from './interfaces';
import { IClaim } from '../../models/claim';
import { IDOK, ITaskModel } from '../../models/target';

// This is required for translating specDocuments to an IClaim type
// tslint:disable:no-unsafe-any no-any

enum Subject {
  ELA = 'English Language Arts',
  MATH = 'Math'
}
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

  arr.forEach(claim => {
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
      newClaim.target[0].interactionType = 'PT';
    }
    newClaim.shortCode = getClaimShortCode(newClaim.subject, newClaim.claimNumber, newClaim.grades);
    if (!newClaim.title.includes('Performance')) {
      newClaim.description = getClaimDesc(newClaim.subject, newClaim.shortCode, ELASpec, MATHSpec);
      if (newClaim.subject !== Subject.MATH && !newClaim.title.includes('Performance')) {
        newClaim.domain = [];
        newClaim.domain.push({
          title: getClaimDomain(newClaim.subject, newClaim.shortCode, ELASpec)
        });
      }
    }
    if (newClaim.shortCode.includes('-')) {
      newClaim.domain = [];
      for (const item of claim.CFItems) {
        if (
          item.CFItemType === 'Domain' ||
          item.abbreviatedStatement === 'Primary Content Domain' ||
          item.abbreviatedStatement === 'Secondary Content Domain'
        ) {
          if (item.abbreviatedStatement === undefined) {
            newClaim.domain.push({
              title: item.fullStatement
            });
          } else {
            newClaim.domain.push({
              title: item.abbreviatedStatement,
              desc: item.fullStatement
            });
          }
        }
      }
      getMultiTarget(claim, newClaim, DOKDOC);
    } else {
      newClaim.target[0].title = claim.CFDocument.title;
      newClaim.target[0].shortCode = getTargetShortCode(claim);

      getTarget(newClaim, claim, DOKDOC);
      const catPT = claim.CFDocument.creator.split(' ');
      catPT
        .filter((p: string) => p.includes('CAT'))
        .forEach((p: string) => (newClaim.target[0].interactionType = p));
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
    }
    claimArray.push(<IClaim>newClaim);
  });

  return consolidate(claimArray);
}

// This function handles target information for multi-grade-and-claim documents
export function getMultiTarget(claim: ISpecDocument, newClaim: any, DOKDOC: ISpecDocument) {
  const tModels: ITaskModel[] = [];
  const titleArr: string[] = [];
  for (const i of claim.CFItems) {
    if (i.CFItemType === 'Target' && i.abbreviatedStatement.includes('Target ')) {
      titleArr.push(i.abbreviatedStatement);
      newClaim.target.push({
        title: `${i.CFDocumentURI.title}, ${i.abbreviatedStatement}`,
        shortCode: i.humanCodingScheme,
        description: i.fullStatement,
        taskModels: [],
        DOK: []
      });
    }
  }

  for (let i = 0; i < claim.CFItems.length; i++) {
    const exampleArr = [];
    if (
      claim.CFItems[i].CFItemType === 'Task Model' &&
      claim.CFItems[i].abbreviatedStatement === undefined
    ) {
      for (let j = i + 1; j < claim.CFItems.length; j++) {
        if (claim.CFItems[j].CFItemType === 'Example') {
          exampleArr.push(claim.CFItems[j].fullStatement);
        } else if (claim.CFItems[j].CFItemType === 'Task Model') {
          break;
        }
      }
      tModels.push({
        taskName: claim.CFItems[i].fullStatement,
        taskDesc: claim.CFItems[i + 1].fullStatement,
        examples: exampleArr
      });
    }
  }

  for (const targ of newClaim.target) {
    let iter = 0;
    targ.taskModels = [];
    let tSplit;
    for (const task of tModels) {
      if (targ.title !== undefined) {
        if (!targ.shortCode.includes('M.GHS')) {
          tSplit = targ.title.split(', ')[2];
        const code = `${newClaim.claimNumber.slice(1)}${tSplit.replace('Target ', '')}`;
        if (task.taskName.split('.')[0].includes(code)) {
          targ.taskModels.push({
            taskName: task.taskName,
            taskDesc: task.taskDesc,
            examples: task.examples
          });
          iter++;
        }
      }
        else {
          targ.taskModels.push(task);
        }

      }
    }
  }

  for (const targ of newClaim.target) {
    let i = 0;
    for (const association of claim.CFAssociations) {
      if (association.originNodeURI.title === targ.shortCode) {
        for (const items of DOKDOC.CFItems) {
          if (association.destinationNodeURI.identifier === items.identifier) {
            targ.DOK = [];
            targ.DOK.push({
              dokCode: items.humanCodingScheme,
              dokDesc: items.fullStatement,
              dokShort: items.abbreviatedStatement
            });
            i++;
          }
        }
      }
    }
  }
  newClaim.target.shift();
}

// This function extracts the target-specific shortcode from one of a documents items
export function getTargetShortCode(claim: ISpecDocument): string | undefined {
  for (const p of claim.CFItems) {
    if (p.CFItemType === 'Target' && p.humanCodingScheme !== undefined) {
      return p.humanCodingScheme;
    }
  }
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
export function getTarget(claim: IClaim, jsonData: ISpecDocument, DOKDOC: ISpecDocument) {
  if (claim.shortCode.includes('M.GHS.C') && !claim.shortCode.includes('C1')) {
    getMultiTarget(jsonData, claim, DOKDOC);
  }
  else {
    for (const target of claim.target) {
      let iter = 0;
      target.taskModels = [];
      target.stem = [];
      target.standards = [];
      target.evidence = [];
      target.rubrics = [];
      for (const p of jsonData.CFItems) {
        const { fullStatement, humanCodingScheme, abbreviatedStatement } = p;
        if (p.CFItemType === 'Measured Skill') {
          if (!target.standards.find(s => s.stdCode === humanCodingScheme)) {
            target.standards.push({
              stdCode: humanCodingScheme,
              stdDesc: fullStatement
            });
          }
        }
        if (p.CFItemType === 'Target') {
          target.description = fullStatement;
        }
        if (p.CFItemType === 'Clarification') {
          target.clarification = fullStatement;
        }
        if (p.CFItemType === 'Section Heading') {
          target.heading = fullStatement;
        }
        if (p.CFItemType === 'Evidence Required') {
          const splitStatement = fullStatement.split(' ');
          if (splitStatement.length > 2) {
            target.evidence.push({
              evTitle: abbreviatedStatement,
              evDesc: fullStatement
            });
          }
        }
        // This block handles a bug in the CASE API where some CFItems are missing their CFItemType property
        if (p.abbreviatedStatement !== undefined) {
          if (p.CFItemType === undefined && p.abbreviatedStatement.includes('Evidence Required ')) {
            target.evidence.push({
              evTitle: abbreviatedStatement,
              evDesc: fullStatement
            });
          }
        }
        if (p.CFItemType === 'Accessibility') {
          target.accessibility = fullStatement;
        }
        if (p.CFItemType === 'Task Description') {
          if (jsonData.CFItems[iter + 1].fullStatement.includes('Task Model ')) {
            target.taskModels.push({
              taskDesc: fullStatement,
              taskName: jsonData.CFItems[iter + 1].fullStatement,
              stimulus: jsonData.CFItems[iter + 2].fullStatement,
              examples: jsonData.CFItems[iter + 4].fullStatement,
              relatedEvidence: ['']
            });
          }
        }
        if (p.CFItemType === 'Stem') {
          target.stem.push({
            stemDesc: fullStatement,
            shortStem: abbreviatedStatement
          });
        }
        iter++;
      }
    }
  }
  getAssociatedEvidence(claim, jsonData);
  getGenReqs(claim, jsonData);

}

export function getAssociatedEvidence(claim: IClaim, jsonData: ISpecDocument) {
  const taskAssociations = jsonData.CFAssociations.filter(
    assoc =>
      assoc.originNodeURI.title.includes('Task Model ') &&
      assoc.destinationNodeURI.title.includes('Evidence Required ')
  );

  for (const tasks of claim.target[0].taskModels) {
    tasks.relatedEvidence = [];
    for (const ta of taskAssociations) {
      if (ta.originNodeURI.title === tasks.taskName) {
        tasks.relatedEvidence.push(ta.destinationNodeURI.title);
      }
    }
  }
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
  let code: string | string[] = shortCode;
  let gradeChars;
  if (shortCode.includes('-')) {
    gradeChars = shortCode.split('.')[1].split('')[1];
    code = shortCode.split('.');
    code = `${code[0]}.G${gradeChars}.${code[2]}`;
  }
  for (const i of jsData.CFItems) {
    if (i.humanCodingScheme === code) {
      return i.fullStatement;
    }
  }
}
// This function consolidates all targets that share the same claim number into a singular claim object with an array of targets.
export function consolidate(claimArray: IClaim[]): IClaim[] {
  let tempArray = [];
  let claimHolder;
  const finalArray: IClaim[] = [];
  const myArray = [];
  let unique: string[] = [];
  for (const claims of claimArray) {
    myArray.push(claims.shortCode);
  }
  unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
  for (const claimCode of unique) {
    tempArray = claimArray.filter(claim => claim.shortCode === claimCode);
    claimHolder = tempArray[0];
    for (const temp of tempArray) {
      if (tempArray.indexOf(temp) === 0) {
        continue;
      } else {
        claimHolder.target.push(temp.target[0]);
      }
    }
    finalArray.push(claimHolder);
    claimHolder = {};
    tempArray = [];
  }
  for (const p of finalArray) {
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

  return handlePT(finalArray);
}

export function handlePT(finalArray: IClaim[]) {
  const PTArr: IClaim [] = [];
  let temp: string;
  let tempIdx;
  for(const claim of finalArray) {
    if(claim.title.includes('Performance')) {
      PTArr.push(claim);
    }
  }
  for(const  PT of PTArr) {
    for(const targ of PT.target) {
      if(parseInt(PT.grades[0],10) < 8) {
      temp = targ.shortCode.slice(0,7);
      tempIdx = finalArray.findIndex((claim) => {
        return claim.shortCode === temp;
      });
      finalArray[tempIdx].target.push(targ);
    }
  }
  }

  return finalArray;
}
