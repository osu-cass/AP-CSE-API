import fetch from 'node-fetch';
import { ISpecDocument, ICFAssociation } from './interfaces';
import { IClaim, ClaimExpansion } from '../../models/claim';
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
/**
 * This function migrates CASE API documents into a new data model.
 *
 * @export
 * @returns {Promise<IClaim[]>}
 */
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
    pushToClaimArray(claimArray, newClaim, claim);
  });

  return consolidate(claimArray);
}

/**
 * Handles merging split multi-targets into the main claim array
 *
 * @export
 * @param {IClaim[]} claimArray
 * @param {IClaim} newClaim
 * @param {ISpecDocument} claim
 */
export function pushToClaimArray(claimArray: IClaim[], newClaim: IClaim, claim: ISpecDocument) {
  let temp: IClaim;
  if (newClaim.target[0].title.includes('Targets ')) {
    const tNum = parseInt(newClaim.target[0].title.split(' Targets ')[1].split('a')[0], 10);
    const tCode = `${newClaim.target[0].shortCode.split(`T${tNum}a`)[0]}T${tNum}b`;
    const targIdx = claim.CFItems.findIndex(i => i.humanCodingScheme === tCode);
    const endTarg = claim.CFItems[targIdx];
    newClaim.target[0].title = `${newClaim.target[0].title.split(' Targets ')[0]} Target ${tNum}a`;
    temp = JSON.parse(JSON.stringify(newClaim));
    temp.target[0].shortCode = endTarg.humanCodingScheme;
    temp.target[0].description = endTarg.fullStatement;
    temp.target[0].title = `${temp.target[0].title.split(' Target ')[0]} Target ${tNum}b`;
    claimArray.push(temp);
  }
  claimArray.push(newClaim);
}

/**
 * This function handles target information for multi-grade-and-claim documents
 *
 * @export
 * @param {ISpecDocument} claim
 * @param {*} newClaim
 * @param {ISpecDocument} DOKDOC
 */
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
      if (targ.title !== undefined && !targ.shortCode.includes('M.GHS')) {
        tSplit = targ.title.split(', ')[2];
        const code = `${newClaim.claimNumber.slice(1)}${tSplit.replace('Target ', '')}`;
        if (task.taskName.split('.')[0].includes(code)) {
          targ.taskModels.push({
            taskName: task.taskName,
            taskDesc: task.taskDesc,
            examples: [task.examples]
          });
          iter++;
        }
      } else {
        targ.taskModels.push(task);
      }
    }
  }

  for (const targ of newClaim.target) {
    for (const association of claim.CFAssociations) {
      for (const items of DOKDOC.CFItems) {
        if (
          association.originNodeURI.title === targ.shortCode &&
          association.destinationNodeURI.identifier === items.identifier
        ) {
          targ.DOK = [];
          targ.DOK.push({
            dokCode: items.humanCodingScheme,
            dokDesc: items.fullStatement,
            dokShort: items.abbreviatedStatement
          });
        }
      }
    }
  }
  newClaim.target.shift();
}

/**
 * This function extracts the target-specific shortcode from one of a documents items
 *
 * @export
 * @param {ISpecDocument} claim
 * @returns {(string | undefined)}
 */
export function getTargetShortCode(claim: ISpecDocument): string | undefined {
  for (const p of claim.CFItems) {
    if (p.CFItemType === 'Target' && p.humanCodingScheme !== undefined) {
      return p.humanCodingScheme;
    }
  }
}

/**
 * This function extracts the claim shortcode in Subject.Grade.Claim format from a document's title
 *
 * @export
 * @param {string} subject
 * @param {string} claim
 * @param {string[]} grade
 * @returns
 */
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

/**
 * This function extracts the claim number from a document's title in CX format (e.g C1, C2, C3)
 * See Data Structure docs for info on the differences between document titles
 * @export
 * @param {string} title
 * @param {string} subject
 * @param {string[]} grades
 * @returns
 */
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

/**
 * Fetches all the data for each document supplied from fetchAllDocs()
 *
 * @export
 * @param {ISpecDocument[]} arr
 * @returns
 */
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

/**
 * Fetches the Identifiers for every document in the CASE DB
 *
 * @export
 * @returns
 */
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

/**
 * Maps Depth-of-knowledge and standards documents
 *
 * @export
 * @returns
 */
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
/**
 *  Extracts target-specific data for a given document
 *
 * @export
 * @param {IClaim} claim
 * @param {ISpecDocument} jsonData
 * @param {ISpecDocument} DOKDOC
 */
export function getTarget(claim: IClaim, jsonData: ISpecDocument, DOKDOC: ISpecDocument) {
  if (claim.shortCode.includes('M.GHS.C') && !claim.shortCode.includes('C1')) {
    getMultiTarget(jsonData, claim, DOKDOC);
  } else {
    for (const target of claim.target) {
      let iter = 0;
      target.taskModels = [];
      target.stem = [];
      target.standards = [];
      target.evidence = [];
      target.rubrics = [];
      for (const p of jsonData.CFItems) {
        const { fullStatement, humanCodingScheme, abbreviatedStatement } = p;
        if (
          p.CFItemType === 'Measured Skill' &&
          !target.standards.find(s => s.stdCode === humanCodingScheme)
        ) {
          target.standards.push({
            stdCode: humanCodingScheme,
            stdDesc: fullStatement
          });
        }
        if (p.CFItemType === 'Target' && p !== jsonData.CFItems[jsonData.CFItems.length - 1]) {
          target.description = fullStatement;
        }
        if (p.CFItemType === 'Clarification') {
          target.clarification = fullStatement;
        }
        if (p.CFItemType === 'Section Heading') {
          target.heading = fullStatement;
        }
        const splitStatement = fullStatement.split(' ');
        if (p.CFItemType === 'Evidence Required' && splitStatement.length > 2) {
          target.evidence.push({
            evTitle: abbreviatedStatement,
            evDesc: fullStatement
          });
        }
        // This block handles a bug in the CASE API where some CFItems are missing their CFItemType property
        if (
          p.abbreviatedStatement !== undefined &&
          p.CFItemType === undefined &&
          p.abbreviatedStatement.includes('Evidence Required ')
        ) {
          target.evidence.push({
            evTitle: abbreviatedStatement,
            evDesc: fullStatement
          });
        }

        if (p.CFItemType === 'Accessibility') {
          target.accessibility = fullStatement;
        }
        if (p.CFItemType === 'Task Model' && p.fullStatement.includes('Task Model ')) {
          target.taskModels.push(getTaskModel(p.identifier, jsonData, p.fullStatement));
          // target.taskModels.push();
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

/**
 * builds the Related Evidence for Task Models
 *
 * @export
 * @param {IClaim} claim
 * @param {ISpecDocument} jsonData
 */
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

/**
 * extracts the target properties that are found under the "General Requirements" itemtypes in a given document
 *
 * @export
 * @param {IClaim} claim
 * @param {ISpecDocument} jsonData
 */
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

/**
 * returns the domain for a given ELA document.
 *
 * @param {string} subject
 * @param {string} shortCode
 * @param {ISpecDocument} ELASpec
 * @returns {(string | undefined)}
 */
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

/**
 * returns the description for a given claim
 *
 * @param {string} subject
 * @param {string} shortCode
 * @param {ISpecDocument} ELASpec
 * @param {ISpecDocument} MATHSpec
 * @returns {(String || undefined)}
 */
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

/**
 *  Consolidates all targets that share the same claim number into a singular claim object with an array of targets.
 *
 * @export
 * @param {IClaim[]} claimArray
 * @returns {IClaim[]}
 */
export function consolidate(claimArray: IClaim[]): IClaim[] {
  let tempArray = [];
  let claimHolder;
  let finalArray: IClaim[] = [];
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
  handlePT(finalArray);
  finalArray = removePT(finalArray);
  expandFirstClaim(finalArray);

  // This forEach fixes an error in the CASE API for E.G5.C1.T6 having an incorrect target shortcode
  finalArray.forEach(c => {
    if (c.shortCode === 'E.G5.C1a') {
      c.target[c.target.findIndex(t => t.title.includes('Target 6'))].shortCode = 'E.G5.C1RL.T6';
    }
  });

  return finalArray.filter(c => c.claimNumber !== 'C1' || c.subject === Subject.MATH);
}

/**
 * Handles Splitting C1 into C1a and C1b claims
 *
 * @export
 * @param {IClaim[]} finalArray
 */
export function expandFirstClaim(finalArray: IClaim[]) {
  const tempArr: IClaim[] = [];
  finalArray.forEach(claim => {
    if (claim.claimNumber === 'C1' && claim.subject === Subject.ELA) {
      const temp = JSON.parse(JSON.stringify(claim));
      temp.claimNumber = 'C1a';
      temp.shortCode = temp.shortCode.replace(claim.claimNumber, temp.claimNumber);
      temp.target = [];
      claim.target.forEach(t => {
        if (parseInt(t.shortCode.split('.')[3].split('T')[1], 10) <= 7) {
          temp.target.push(t);
        }
      });
      claim.shortCode = claim.shortCode.replace(claim.claimNumber, 'C1b');
      claim.claimNumber = 'C1b';
      claim.target = claim.target.filter(
        t => parseInt(t.shortCode.split('.')[3].split('T')[1], 10) > 7
      );
      tempArr.push(temp);
    }
  });
  tempArr.forEach(c => finalArray.push(c));
}

/**
 * Merges Performance Task Targets into their corresponding grade-and-claims
 *
 * @export
 * @param {IClaim[]} finalArray
 */
export function handlePT(finalArray: IClaim[]) {
  let PTArr: IClaim[] = [];
  let tempIdx;

  PTArr = finalArray.filter(claim => claim.title.includes('Performance'));
  PTArr.forEach(PT => {
    for (const targ of PT.target) {
      if (parseInt(PT.grades[0], 10) < 8) {
        tempIdx = finalArray.findIndex(claim => {
          return claim.shortCode === targ.shortCode.slice(0, 7);
        });
        finalArray[tempIdx].target.push(targ);
      }
    }
  });
}

export function removePT(finalArray: IClaim[]) {
  return finalArray.filter(claim => !claim.title.includes('Performance'));
}

// tslint:disable:no-non-null-assertion
/**
 * Handles building task models with Item Associations
 *
 * @export
 * @param {string} identifier
 * @param {ISpecDocument} jsonData
 * @param {string} name
 * @returns {ITaskModel}
 */
export function getTaskModel(
  identifier: string,
  jsonData: ISpecDocument,
  name: string
): ITaskModel {
  const associations = jsonData.CFAssociations.filter(
    a => a.destinationNodeURI.identifier === identifier
  );
  const descId = associations.find(a => a.originNodeURI.title === 'Task Description')!.originNodeURI
    .identifier;
  const stimId = associations.find(a => a.originNodeURI.title === 'Stimulus')
    ? associations.find(a => a.originNodeURI.title === 'Stimulus')!.originNodeURI.identifier
    : undefined;
  const stemId = associations.find(a => a.originNodeURI.title === 'Appropriate Stems')
    ? associations.find(a => a.originNodeURI.title === 'Appropriate Stems')!.originNodeURI
        .identifier
    : undefined;
  const stemInfo = stemId
    ? {
        stemDesc: jsonData.CFItems.find(c => c.identifier === stemId)!.fullStatement,
        shortStem: jsonData.CFItems.find(c => c.identifier === stemId)!.abbreviatedStatement
      }
    : undefined;

  return {
    taskName: name,
    taskDesc: jsonData.CFItems.find(c => c.identifier === descId)!.fullStatement,
    stimulus: stimId
      ? jsonData.CFItems.find(c => c.identifier === stimId)!.fullStatement
      : undefined,
    stem: stemInfo
  };
}
