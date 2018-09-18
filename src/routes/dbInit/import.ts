import fetch  from 'node-fetch';
import { SpecDocument, blankSpec, Claim, blankNewClaim, NewClaim, blankClaim } from './interfaces';
const arr: SpecDocument[] = [];
const docs = ['smarter_balanced_ela_content_specification', 'air_deprecated_ela_claims_and_targets', 'air_deprecated_math_claims_and_targets', 'ccss_imported_from_digital_library',
    'common_core_state_standards_for_ela', 'common_core_state_standards_for_mathematics', 'item_type_response_type', 'major_vs__additional_supporting__math_', 'major_vs__additional_supporting__math_', 'smarter_balanced_math_content_specification', 'norm_webb_s_depth_of_knowledge__dok__levels_of_cognitive_difficulty'];

const claimArray: Claim[] = [];
const claimArrayv: NewClaim[] = [];
const docArr: SpecDocument[] = [];
const docNames: string[] = [];
let jsonData;



export async function importDbEntries() {

    await importDocs();
    const specs = specDocs();
    const ELASpec: SpecDocument = specs[0];
    const MATHSpec: SpecDocument = specs[1];
    const DOKDOC: SpecDocument = specs[2];

    for (let i = 0; i < arr.length; i++) {
        jsonData = arr;
        // tslint:disable:no-unsafe-any
        claimArray[i] = JSON.parse(JSON.stringify(blankClaim));
        claimArrayv[i] = JSON.parse(JSON.stringify(blankNewClaim));

        if (jsonData[i].CFDocument.subject === undefined) {
            claimArray[i].subject = 'English Language Arts';
        }
        else {
            claimArray[i].subject = jsonData[i].CFDocument.subject[0];
        }
        claimArray[i].title = jsonData[i].CFDocument.title;
        if (jsonData[i].CFItems[0].educationLevel.length > 1) {
            for (let j = 0; j < jsonData[i].CFItems[0].educationLevel.length; j++) {
                claimArray[i].grades[j] = jsonData[i].CFItems[0].educationLevel[j];
            }
        }
        else {
            claimArray[i].grades[0] = `${parseInt(jsonData[i].CFItems[0].educationLevel[0], 10)}`;
        }

        claimArray[i].claimNumber = getClaim(claimArray[i].title, claimArray[i].subject, claimArray[i].grades);
        if (claimArray[i].title.includes('Performance')) {
            while (claimArray[i].claimNumber.charAt(0) === 'C') {
                claimArray[i].claimNumber = claimArray[i].claimNumber.substr(1);
            }
            claimArray[i].target[0].type = 'PT';
        }
        claimArray[i].shortCode = getClaimShortCode(claimArray[i].subject, claimArray[i].claimNumber, claimArray[i].grades);
        if (!claimArray[i].title.includes('Performance')) {
        claimArray[i].description = getClaimDesc(claimArray[i].subject, claimArray[i].shortCode, ELASpec, MATHSpec);
        }
        if (claimArray[i].subject !== 'Math') {
            claimArray[i].domain = getClaimDomain(claimArray[i].subject, claimArray[i].shortCode, ELASpec);


        }


        claimArray[i].target[0].title = jsonData[i].CFDocument.title;
        claimArray[i].target[0].shortCode = jsonData[i].CFDocument.notes;

        getTarget(jsonData[i], i);

        const catPT = jsonData[i].CFDocument.creator.split(' ');
        for (const p of catPT) {
            if (p.includes('CAT')) {
                claimArray[i].target[0].type = p;
            }
        }
        let dokSpec: SpecDocument = blankSpec;

        if (claimArray[i].subject === 'English Language Arts') {
            dokSpec = ELASpec;
        }
        else if(claimArray[i].subject === 'Math') {
            dokSpec = MATHSpec;
        }
        let y = 0;
        let uriString: string[];
        for (const p of dokSpec.CFAssociations) {

            if (p.originNodeURI.title.includes(claimArray[i].target[0].shortCode)) {

                if (p.destinationNodeURI.uri.includes('DOK')) {
                    uriString = p.destinationNodeURI.uri.split('DOK:');
                    const uri = uriString[1].replace('%20', '');
                    if (!claimArray[i].target[0].DOK.includes(uri)) {
                        claimArray[i].target[0].DOK[y] = uri;
                        y++;
                    }

                }
            }
        }
        for (let p = 0; p < claimArray[i].target[0].DOK.length; p++) {
            for (const q of  DOKDOC.CFItems) {
                if (q.humanCodingScheme === claimArray[i].target[0].DOK[p]) {
                    claimArray[i].target[0].DOKDesc[p] = q.fullStatement;
                    claimArray[i].target[0].shortDOK[p] = q.abbreviatedStatement;
                }
            }
        }
    }
    migrateStructure();
    consolidate();

    return (claimArrayv);
}

export function getClaimShortCode(subject: string, claim: string, grade: string[]) {
    let gradeLevel;


        if (parseInt(grade[0], 10) > 8) {
            gradeLevel = 'HS';
        }


    else {
        gradeLevel = grade;
    }
    if (subject === 'English Language Arts') {

        return `E.G${gradeLevel}.${claim}`;
    }

        return `M.G${gradeLevel}.${claim}`;

}

export function getClaim(title: string, subject: string, grades: string[]) {
    let titlecopy = (` ${title}`).slice(1);
    let titlearray = [];


    if (subject === 'English Language Arts') {
        if (!title.includes('Performance')) {
            titlearray = titlecopy.split(' ');

            return `C${titlearray[7]}`;

        }

            titlecopy = titlecopy.replace('English Language Arts Performance Task Specification: ', '');
            titlecopy = titlecopy.replace('Grade ', '');
            if(grades.length > 1) {
                for(const p of grades) {
                    titlecopy = titlecopy.replace(p, '');
                }
            }
                else {
            titlecopy = titlecopy.replace(grades[0], '');
                }
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
export async function importDocs() {

    const packages: string[] = await fetchAllDocs();
    // tslint:disable-next-line
console.log('Starting import...');
for (let i = 0; i < packages.length; i++) {
    // tslint:disable-next-line
    console.log(((i / packages.length) * 100).toPrecision(3) + '%');
    const stuff = await fetch(`https://case.smarterbalanced.org/ims/case/v1p0/CFPackages/${packages[i]}`);
    const jsonData: SpecDocument = await stuff.json();
    const title: string = jsonData.CFDocument.title;
    const filename: string = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (!docs.includes(filename)) {
        arr.push(jsonData);
    }
    else {
        docNames.push(filename);
        docArr.push(jsonData);
    }
}

return packages.length;
}


export async function fetchAllDocs() {
    const p: string[] = [];
    const temp = await fetch('https://case.smarterbalanced.org/ims/case/v1p0/CFDocuments?limit=99999999999&offset=0&sort&orderBy&filter&fields');
    const idDoc = await temp.json();
    // for (let j = 0; j < idDoc.CFDocuments.length; j++) {
        for (const j of idDoc.CFDocuments) {
        p.push(j.identifier);
    }

    return p;
}

export function specDocs() {

    let ELASpec: SpecDocument = blankSpec;
    let MATHSpec: SpecDocument = blankSpec;
    let DOKDOC: SpecDocument = blankSpec;

for(let i = 0; i < docNames.length; i++) {


        if(docNames[i].includes('smarter_balanced_ela_content_specification')) {
           ELASpec = docArr[i];
        }
        else if(docNames[i].includes('smarter_balanced_math_content_specification')) {
                MATHSpec = docArr[i];
            }
        else if(docNames[i].includes('norm_webb_s_depth_of_knowledge__dok__levels_of_cognitive_difficulty')) {
            DOKDOC = docArr[i];
        }
    }

    return [ELASpec, MATHSpec, DOKDOC];
}
export function getTarget(jsonData: SpecDocument, i: number) {


    let l = 0;
    let c = 0;
    let x = 0;
    let v = 0;
    let b = 0;
    let a = 0;
    let m = 0;
    let n = 0;

for (const p of jsonData.CFItems) {
    if (p.CFItemType === 'Target') {
        claimArray[i].target[0].description = p.fullStatement;
        claimArray[i].target[0].shortCode = p.humanCodingScheme;
    }
    if (p.CFItemType === 'Measured Skill') {
        if (!claimArray[i].target[0].standards.includes(p.humanCodingScheme)) {
            claimArray[i].target[0].standards[l] = p.humanCodingScheme;
            claimArray[i].target[0].stdDesc[l] = p.fullStatement;
            l++;
        }

    }
    if (p.CFItemType === 'Clarification') {
        claimArray[i].target[0].clarification = p.fullStatement;
    }
    if (p.CFItemType === 'Section Heading') {
        claimArray[i].target[0].heading = p.fullStatement;
    }
    if (p.CFItemType === 'Evidence Required') {
        const splitto = p.fullStatement.split(' ');
        if (splitto.length > 2) {
            claimArray[i].target[0].evidence[x] = p.fullStatement;
            x++;
        }
    }
    if (p.CFItemType === 'Accessibility') {
        claimArray[i].target[0].accessibility = p.fullStatement;
    }
    if (p.CFItemType === 'Task Model') {
        if (p.fullStatement !== 'Task Models') {
            claimArray[i].target[0].taskModel[c] = p.fullStatement;
            c++;
        }
    }
    if (p.CFItemType === 'Task Description') {
        claimArray[i].target[0].taskDescription[v] = p.fullStatement;
        v++;
    }
    if (p.CFItemType === 'Stimulus') {
        claimArray[i].target[0].stimulus[b] = p.fullStatement;
        b++;
    }

    if (p.CFItemType === 'Stem') {

        const stem = p.fullStatement;
        claimArray[i].target[0].stem[n] = p.fullStatement;
        claimArray[i].target[0].shortStem[n] = p.abbreviatedStatement;
        n++;
    }
    if (p.CFItemType === 'Example') {
        claimArray[i].target[0].examples[m] = p.fullStatement;
        m++;
    }
    if (p.CFItemType === 'Rubric') {
        claimArray[i].target[0].rubrics[a] = p.fullStatement;
        a++;
    }
}
getGenReqs(jsonData, i);
}
export function getGenReqs(jsonData: SpecDocument, i: number) {
for (const p of jsonData.CFItems) {
    if (p.CFItemType === 'General Requirements') {

        if (p.abbreviatedStatement === 'Key/Construct Relevant Vocabulary') {

            claimArray[i].target[0].vocab = p.fullStatement;

        }
        if (p.abbreviatedStatement === 'Allowable Tools') {
            claimArray[i].target[0].tools = p.fullStatement;

        }
        if (p.abbreviatedStatement === 'Stimuli/Passages') {
            claimArray[i].target[0].stimInfo = p.fullStatement;

        }
        if (p.abbreviatedStatement === 'Stimuli/Text Complexity') {
            claimArray[i].target[0].complexity = p.fullStatement;
        }
        if (p.abbreviatedStatement === 'Development Notes') {
            claimArray[i].target[0].devNotes = p.fullStatement;
        }
        if (p.abbreviatedStatement === 'Dual-Text Stimuli') {
            claimArray[i].target[0].dualText = p.fullStatement;

        }
    }
}
}

function getClaimDomain(subject: string, shortCode: string, ELASpec: SpecDocument): string {
    const jsData: SpecDocument = ELASpec;
    for (let i = 0; i < jsData.CFItems.length; i++) {

        if (jsData.CFItems[i].humanCodingScheme === shortCode) {
            if (jsData.CFItems[i + 1].CFItemType === 'Domain') {
                return jsData.CFItems[i + 1].fullStatement;
            }

        }


    }

    return 'null';
}
export function migrateStructure() {
for (let i = 0; i < claimArray.length; i++) {
    claimArrayv[i].title = claimArray[i].title;
    claimArrayv[i].claimNumber = claimArray[i].claimNumber;
    claimArrayv[i].grades = claimArray[i].grades;
    claimArrayv[i].subject = claimArray[i].subject;
    claimArrayv[i].description = claimArray[i].description;
    claimArrayv[i].shortCode = getClaimShortCode(claimArray[i].subject, claimArray[i].claimNumber, claimArray[i].grades);

    claimArrayv[i].domain = claimArray[i].domain;

    claimArrayv[i].target[0].title = claimArray[i].target[0].title;
    claimArrayv[i].target[0].shortCode = claimArray[i].target[0].shortCode;
    claimArrayv[i].target[0].description = claimArray[i].target[0].description;
    claimArrayv[i].target[0].type = claimArray[i].target[0].type;
    claimArrayv[i].target[0].clarification = claimArray[i].target[0].clarification;
    claimArrayv[i].target[0].heading = claimArray[i].target[0].heading;
    claimArrayv[i].target[0].evidence = claimArray[i].target[0].evidence;
    claimArrayv[i].target[0].vocab = claimArray[i].target[0].vocab;
    claimArrayv[i].target[0].tools = claimArray[i].target[0].tools;
    claimArrayv[i].target[0].stimInfo = claimArray[i].target[0].stimInfo;
    claimArrayv[i].target[0].devNotes = claimArray[i].target[0].devNotes;
    claimArrayv[i].target[0].complexity = claimArray[i].target[0].complexity;
    claimArrayv[i].target[0].dualText = claimArray[i].target[0].dualText;
    claimArrayv[i].target[0].accessibility = claimArray[i].target[0].accessibility;
    for (let x = 0; x < claimArray[i].target[0].standards.length; x++) {
        claimArrayv[i].target[0].standards[x] = {
            stdCode: claimArray[i].target[0].standards[x],
            stdDesc: claimArray[i].target[0].stdDesc[x]
        };
    }
    for (let x = 0; x < claimArray[i].target[0].DOK.length; x++) {
        claimArrayv[i].target[0].DOK[x] = {
            dokCode: claimArray[i].target[0].DOK[x],
            dokDesc: claimArray[i].target[0].DOKDesc[x],
            dokShort: claimArray[i].target[0].shortDOK[x],
        };
    }
    for (let x = 0; x < claimArray[i].target[0].stem.length; x++) {
        claimArrayv[i].target[0].stem[x] = {
            stemDesc: claimArray[i].target[0].stem[x],
            shortStem: claimArray[i].target[0].shortStem[x]
        };
    }
    for (let x = 0; x < claimArray[i].target[0].taskModel.length; x++) {

        claimArrayv[i].target[0].taskModels[x] = {
            taskName: claimArray[i].target[0].taskModel[x],
            taskDesc: claimArray[i].target[0].taskDescription[x],
            examples: claimArray[i].target[0].examples[x],
            stimulus: claimArray[i].target[0].stimulus[x],
            rubrics: claimArray[i].target[0].rubrics

        };
    }



}
}

function getClaimDesc(subject: string, shortCode: string, ELASpec: SpecDocument, MATHSpec: SpecDocument): string {
    let jsData;
    if (subject === 'English Language Arts') {
        jsData = ELASpec;
    }
    else {
        jsData = MATHSpec;
    }
    for (const i of jsData.CFItems) {

        if (i.humanCodingScheme === shortCode) {

            return i.fullStatement;

        }

    }

    return 'null';
}
export function consolidate() {
let r = 0;
    for (let p = 0; p < claimArrayv.length; p++) {
        r = 0;
        for (let q = 0; q < claimArrayv.length; q++) {
            if (claimArrayv[q].shortCode === claimArrayv[p].shortCode && q !== p) {
                claimArrayv[p].target.push(claimArrayv[q].target[0]);
                claimArrayv.splice(q, 1);
                q = 0;
            }
        }
    }
    for (const p of claimArrayv) {
        if (p.subject === 'English Language Arts') {
            if (!p.title.includes('Performance')) {
                const titlecopy = p.title.split(' ');
                p.title = titlecopy.slice(0, 8).join(' ');

            }
        }
        else {
            const titlecopy = p.title.split(' ');
            if (p.title.includes('Grade ')) {
                p.title = titlecopy.slice(0, 6).join(' ');
            }

        }

    }
}