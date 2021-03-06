import { default as fetch } from 'jest-fetch-mock';
jest.setMock('node-fetch', fetch);
import { importDbEntries, getClaimShortCode, getClaim, importDocs, fetchAllDocs } from '.';
import { mockData } from './mocks/mockAllDocs';
import { mockPack } from './mocks/mockELAPackage';
import { mockMATHPackage } from './mocks/mockMATHPackage';
import { mockELA } from './mocks/mockELA';
import { mockMATH } from './mocks/mockMATH';
import { mockDOK } from './mocks/mockDOK';
import { ISpecDocument } from './interfaces';
import { mockMATHClone } from './mocks/mockMATHClone';
import { mockHSMATH } from './mocks/mockHSMATH';
import { mockTMATH } from './mocks/mockTargetlessMATH';
import { mockIT } from './mocks/mockIT';
import { singleGradePT } from './mocks/mockSingleGradePT';

const subject = ['English Language Arts', 'Math'];
const claim: string = 'C1';
const grade: string[] = ['3'];
const hs: string[] = ['10'];
const gradeZero = ['0', '10'];
const title = [
  'English Language Arts Specification: Grade 3 Claim 1 Target 1',
  'Grade 3 Mathematics Item Specification C1 TH',
  'HS Mathematics Item Specification C1 TH',
  'Math Grades 6-9, Claim 1',
  'Math High School, Claim 1'
];
const shortCode = ['E.G3.C1', 'M.G3.C1', 'M.GHS.C1'];
const packages = [
  '6a3ccfc6-cc76-11e7-8974-cfcd479e782c',
  '5ee431c8-e4f4-11e7-b616-33d3a2d9d38d',
  'cbbb8d01-63fc-4adf-9803-a3781839b6b6',
  '255adad7-2854-47d7-9aa4-c5e1750eb8ca',
  'b7bc9d8c-cb5f-4dc8-96da-13ce635053d1',
  '1796d9a2-d5ee-11e7-b39f-71a145b86a18',
  '29152488-d04c-11e7-beeb-69048cb024ee',
  'f5fcd780-0539-11e8-b5aa-2b654ff8ee27',
  'cba081b2-b59d-11e7-a02a-eb18540295b7',
  '080b6490-f08c-11e7-a604-654871858e0d',
  'db93d530-b997-11e7-8abc-3327a9111ac8',
  'ddd1045a-d29f-11e7-8ec6-ebfef2b95d1c',
  'ddd1045a-d29f-11e7-8ec6-ebfef2b95d1c',
  'bbc88b2e-cf0e-11e7-8986-0d6dd40bd034'
];
const arr: ISpecDocument[] = [];

describe('Case API Scraper', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('fetches AllCFDocuments', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));
    const result = await fetchAllDocs();
    expect(fetch.mock.calls.length).toBe(1);
    expect(result).toEqual(packages);
  });
  it('imports claim documents', async () => {
    mockFetch();
    const result = await importDocs(arr);
    expect(fetch.mock.calls.length).toBe(15);
    expect(result).toBe(14);
  });
  it('returns valid data for db', async () => {
    mockFetch();
    await importDbEntries();
    expect(fetch.mock.calls.length).toBe(15);
  });
  it('makes shortcodes', () => {
    const ELAresult = getClaimShortCode(subject[0], claim, grade);
    const MATHresult = getClaimShortCode(subject[1], claim, grade);
    const hsResult = getClaimShortCode(subject[1], claim, hs);
    expect(ELAresult).toEqual(shortCode[0]);
    expect(MATHresult).toEqual(shortCode[1]);
    expect(hsResult).toEqual(shortCode[2]);
  });
  it('gets the claim from the document title', () => {
    const ELAresult = getClaim(title[0], subject[0], grade);
    const MATHresult = getClaim(title[1], subject[1], grade);
    const MATHAlt = getClaim(title[2], subject[1], grade);
    const MATHAlt1 = getClaim(title[3], subject[1], grade);
    expect(getClaim(title[4], subject[1], gradeZero)).toEqual(claim);
    expect(getClaim(title[4], subject[1], grade)).toEqual(claim);
    expect(MATHresult).toEqual(claim);
    expect(MATHAlt).toEqual(claim);
    expect(MATHAlt1).toEqual(claim);
    expect(ELAresult).toEqual(claim);
  });
});
function mockFetch() {
  fetch
    .once(JSON.stringify(mockData))
    .mockResponses(
      [JSON.stringify(mockPack[0])],
      [JSON.stringify(mockELA)],
      [JSON.stringify(mockMATH)],
      [JSON.stringify(mockDOK)],
      [JSON.stringify(mockMATHPackage)],
      [JSON.stringify(mockMATHClone)],
      [JSON.stringify(mockHSMATH)],
      [JSON.stringify(mockTMATH)],
      [JSON.stringify(mockPack[1])],
      [JSON.stringify(mockIT)],
      [JSON.stringify(mockPack[2])],
      [JSON.stringify(mockPack[3])],
      [JSON.stringify(singleGradePT)],
      [JSON.stringify(mockPack[4])]
    );
}
