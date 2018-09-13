// tslint:disable
import fs from 'fs';
import fetch  from 'node-fetch';
const arr: any = [];
const docs = ['smarter_balanced_ela_content_specification', 'air_deprecated_ela_claims_and_targets', 'air_deprecated_math_claims_and_targets', 'ccss_imported_from_digital_library',
	'common_core_state_standards_for_ela', 'common_core_state_standards_for_mathematics', 'item_type_response_type', 'major_vs__additional_supporting__math_', 'major_vs__additional_supporting__math_', 'smarter_balanced_math_content_specification', 'norm_webb_s_depth_of_knowledge__dok__levels_of_cognitive_difficulty'];

const claimArray: any = [1000];
const claimArrayv: any = [1000];
let docArr: any = [];
let docNames: any = [];
let jsonData;
const claim = {
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
const claimv = {
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

export async function importDbEntries() {

	let total = await importDocs();
	let ELASpec: any;
	let MATHSpec: any;
	let DOKDOC: any;
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
	

	for (let i = 0; i < arr.length; i++) {
		jsonData = arr;
		claimArray[i] = JSON.parse(JSON.stringify(claim));
		claimArrayv[i] = JSON.parse(JSON.stringify(claimv));
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
			claimArray[i].grades = parseInt(jsonData[i].CFItems[0].educationLevel, 10);
		}

		claimArray[i].claimNumber = getClaim(claimArray[i].title, claimArray[i].subject, claimArray[i].grades);
		if (claimArray[i].title.includes('Performance')) {
			while (claimArray[i].claimNumber.charAt(0) === 'C') {
				claimArray[i].claimNumber = claimArray[i].claimNumber.substr(1);
			}
			claimArray[i].target[0].type = 'PT';
		}
		claimArray[i].shortCode = getClaimShortCode(claimArray[i].subject, claimArray[i].claimNumber, claimArray[i].grades);
		claimArray[i].description = getClaimDesc(claimArray[i].subject, claimArray[i].shortCode);
		if (claimArray[i].subject !== 'Math') {
			claimArray[i].domain = getClaimDomain(claimArray[i].subject, claimArray[i].shortCode);


		}

		let l = 0;
		let c = 0;
		let x = 0;
		let v = 0;
		let b = 0;
		let a = 0;
		let m = 0;
		let n = 0;

		claimArray[i].target[0].title = jsonData[i].CFDocument.title;
		claimArray[i].target[0].shortCode = jsonData[i].CFDocument.notes;
		for (let p = 0; p < jsonData[i].CFItems.length; p++) {
			if (jsonData[i].CFItems[p].CFItemType === 'Target') {
				claimArray[i].target[0].description = jsonData[i].CFItems[p].fullStatement;
				claimArray[i].target[0].shortCode = jsonData[i].CFItems[p].humanCodingScheme;
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Measured Skill') {
				if (!claimArray[i].target[0].standards.includes(jsonData[i].CFItems[p].humanCodingScheme)) {
					claimArray[i].target[0].standards[l] = jsonData[i].CFItems[p].humanCodingScheme;
					claimArray[i].target[0].stdDesc[l] = jsonData[i].CFItems[p].fullStatement;
					l++;
				}

			}
			if (jsonData[i].CFItems[p].CFItemType === 'Clarification') {
				claimArray[i].target[0].clarification = jsonData[i].CFItems[p].fullStatement;
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Section Heading') {
				claimArray[i].target[0].heading = jsonData[i].CFItems[p].fullStatement;
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Evidence Required') {
				const splitto = jsonData[i].CFItems[p].fullStatement.split(' ');
				if (splitto.length > 2) {
					claimArray[i].target[0].evidence[x] = jsonData[i].CFItems[p].fullStatement;
					x++;
				}
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Acessibility') {
				claimArray[i].target[0].accessibility = jsonData[i].CFItems[p].fullStatement;
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Task Model') {
				if (jsonData[i].CFItems[p].fullStatement !== 'Task Models') {
					claimArray[i].target[0].taskModel[c] = jsonData[i].CFItems[p].fullStatement;
					c++;
				}
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Task Description') {
				claimArray[i].target[0].taskDescription[v] = jsonData[i].CFItems[p].fullStatement;
				v++;
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Stimulus') {
				claimArray[i].target[0].stimulus[b] = jsonData[i].CFItems[p].fullStatement;
				b++;
			}

			if (jsonData[i].CFItems[p].CFItemType === 'Stem') {

				const stem = jsonData[i].CFItems[p].fullStatement;
				claimArray[i].target[0].stem[n] = jsonData[i].CFItems[p].fullStatement;
				claimArray[i].target[0].shortStem[n] = jsonData[i].CFItems[p].abbreviatedStatement;
				n++;
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Example') {
				claimArray[i].target[0].examples[m] = jsonData[i].CFItems[p].fullStatement;
				m++;
			}
			if (jsonData[i].CFItems[p].CFItemType === 'Rubric') {
				claimArray[i].target[0].rubrics[a] = jsonData[i].CFItems[p].fullStatement;
				a++;
			}
		}
		for (let p = 0; p < jsonData[i].CFItems.length; p++) {
			if (jsonData[i].CFItems[p].CFItemType === 'General Requirements') {

				if (jsonData[i].CFItems[p].abbreviatedStatement === 'Key/Construct Relevant Vocabulary') {

					claimArray[i].target[0].vocab = jsonData[i].CFItems[p].fullStatement;

				}
				if (jsonData[i].CFItems[p].abbreviatedStatement === 'Allowable Tools') {
					claimArray[i].target[0].tools = jsonData[i].CFItems[p].fullStatement;

				}
				if (jsonData[i].CFItems[p].abbreviatedStatement === 'Stimuli/Passages') {
					claimArray[i].target[0].stimInfo = jsonData[i].CFItems[p].fullStatement;

				}
				if (jsonData[i].CFItems[p].abbreviatedStatement === 'Stimuli/Text Complexity') {
					claimArray[i].target[0].complexity = jsonData[i].CFItems[p].fullStatement;
				}
				if (jsonData[i].CFItems[p].abbreviatedStatement === 'Development Notes') {
					claimArray[i].target[0].devNotes = jsonData[i].CFItems[p].fullStatement;
				}
				if (jsonData[i].CFItems[p].abbreviatedStatement === 'Dual-Text Stimuli') {
					claimArray[i].target[0].dualText = jsonData[i].CFItems[p].fullStatement;

				}
			}
		}
		const catPT = jsonData[i].CFDocument.creator.split(' ');
		for (let p = 0; p < catPT.length; p++) {
			if (catPT[p].includes('CAT')) {
				claimArray[i].target[0].type = catPT[p];
			}
		}
		let dokSpec;
		if (claimArray[i].subject === 'English Language Arts') {
			dokSpec = ELASpec;
		}
		else {
			dokSpec = MATHSpec;
		}
		let y = 0;
		let uriString = '';
		for (let p = 0; p < dokSpec.CFAssociations.length; p++) {
			uriString = '';
			if (dokSpec.CFAssociations[p].originNodeURI.title.includes(claimArray[i].target[0].shortCode)) {

				if (dokSpec.CFAssociations[p].destinationNodeURI.uri.includes('DOK')) {
					uriString = dokSpec.CFAssociations[p].destinationNodeURI.uri.split('DOK:');
					uriString = uriString[1].replace('%20', '');
					if (!claimArray[i].target[0].DOK.includes(uriString)) {
						claimArray[i].target[0].DOK[y] = uriString;
						y++;
					}

				}
			}
		}
		for (let p = 0; p < claimArray[i].target[0].DOK.length; p++) {
			for (let q = 0; q < DOKDOC.CFItems.length; q++) {
				if (DOKDOC.CFItems[q].humanCodingScheme === claimArray[i].target[0].DOK[p]) {
					claimArray[i].target[0].DOKDesc[p] = DOKDOC.CFItems[q].fullStatement;
					claimArray[i].target[0].shortDOK[p] = DOKDOC.CFItems[q].abbreviatedStatement;
				}
			}
		}

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
					stimulus: claimArray[i].target[0].stimulus[x]
				};
			}
			claimArrayv[i].target[0].rubrics = claimArray[i].target[0].rubrics;


		}
	}

	
	function getClaimDesc(subject: any, shortCode: any) {
		let jsData;
		if (subject === 'English Language Arts') {
			jsData = ELASpec;
		}
		else {
			jsData = MATHSpec;
		}
		for (let i = 0; i < jsData.CFItems.length; i++) {

			if (jsData.CFItems[i].humanCodingScheme === shortCode) {

				return jsData.CFItems[i].fullStatement;

			}

		}
	}

	function getClaimDomain(subject: any, shortCode: any) {
		let jsData;
		if (subject === 'English Language Arts') {
			jsData = ELASpec;
		}
		else {
			jsData = MATHSpec;
		}
		for (let i = 0; i < jsData.CFItems.length; i++) {

			if (jsData.CFItems[i].humanCodingScheme === shortCode) {
				if (jsData.CFItems[i + 1].CFItemType === 'Domain') {
					return jsData.CFItems[i + 1].fullStatement;
				}
				else {
					return null;
				}
			}


		}
	}

	

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
	for (let p = 0; p < claimArrayv.length; p++) {
		if (claimArrayv[p].subject === 'English Language Arts') {
			if (!claimArrayv[p].title.includes('Performance')) {
				const titlecopy = claimArrayv[p].title.split(' ');
				claimArrayv[p].title = titlecopy.slice(0, 8).join(' ');

			}
		}
		else {
			const titlecopy = claimArrayv[p].title.split(' ');
			if (claimArrayv[p].title.includes('Grade ')) {
				claimArrayv[p].title = titlecopy.slice(0, 6).join(' ');
			}

		}

	}
	return (JSON.stringify(claimArrayv, null, 4));
}

export function getClaimShortCode(subject: any, claim: any, grade: any) {
	let gradeLevel;
	if (parseInt(grade, 10) > 8) {
		gradeLevel = 'HS';
	}
	else {
		gradeLevel = grade;
	}
	if (subject === 'English Language Arts') {

		const shortcode = 'E.G' + gradeLevel + '.' + claim;
		return shortcode;
	}
	else {
		const shortcode = 'M.G' + gradeLevel + '.' + claim;
		return shortcode;
	}
}

export function getClaim(title: any, subject: any, grades: any) {
	let titlecopy = (' ' + title).slice(1);
	let titlearray = [];

	if (grades[0] === '0') {
		const grading = grades.pop();
	}
	if (subject === 'English Language Arts') {
		if (!title.includes('Performance')) {
			titlearray = titlecopy.split(' ');
			return 'C' + titlearray[7];

		}
		else {
			titlecopy = titlecopy.replace('English Language Arts Performance Task Specification: ', '');
			titlecopy = titlecopy.replace('Grade ', '');
			titlecopy = titlecopy.replace(grades, '');
			titlecopy = titlecopy.replace(' ', '');
			return 'C' + titlecopy;
		}
	}
	else {
		titlearray = titlecopy.split(' ');
		if (title.includes('Grade ')) {
			return titlearray[5];
		}
		else if (title.includes('Grades ')) {
			return 'C' + titlearray[4];
		}
		else if (title.includes('Mathematics ')) {
			return titlearray[4];
		}
		else {
			return 'C' + titlearray[4];
		}


	}
}
export async function importDocs() {
	
	const packages: any = await fetchAllDocs();
console.log('Starting import...');
for (let i = 0; i < packages.length; i++) {
	let total = i;
	console.log(((i / packages.length) * 100).toPrecision(3) + '%');
	const stuff = await fetch('https://case.smarterbalanced.org/ims/case/v1p0/CFPackages/' + packages[i]);
	const jsonData = await stuff.json();
	const title = jsonData.CFDocument.title;
	const filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
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
	let p: any = [];
	const temp = await fetch('https://case.smarterbalanced.org/ims/case/v1p0/CFDocuments?limit=99999999999&offset=0&sort&orderBy&filter&fields');
	const idDoc = await temp.json();
	for (let j = 0; j < idDoc.CFDocuments.length; j++) {
		p.push(idDoc.CFDocuments[j].identifier);
	}

	return p;
}