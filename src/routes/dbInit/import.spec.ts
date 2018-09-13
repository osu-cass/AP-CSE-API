// tslint:disable-next-line
import fetch from 'jest-fetch-mock';
jest.setMock('node-fetch', fetch);
import fs from 'fs';
import { importDbEntries, getClaimShortCode, getClaim, importDocs, fetchAllDocs } from './import';
import { mockData } from './__mocks__/mockAllDocs';
import { mockPack } from './__mocks__/mockELAPackage';
import { mockMATHPackage } from './__mocks__/mockMATHPackage';
import { mockELA } from './__mocks__/mockELA';
import { mockMATH } from './__mocks__/mockMATH';
import { mockDOK } from './__mocks__/mockDOK';
import { mockDB } from './__mocks__/mockDBEntry';
import { mockPT } from './__mocks__/mockPT';
const subject = ['English Language Arts', 'Math'];
const claim: string = 'C1';
const grade: string = '3';
const hs: string  = '10';
const title = [
    'English Language Arts Specification: Grade 3 Claim 1 Target 1',
    'Grade 3 Mathematics Item Specification C1 TH',
    'HS Mathematics Item Specification C1 TH',
    'Math Grades 6-9, Claim 1'
];
const shortCode = ['E.G3.C1', 'M.G3.C1', 'M.GHS.C1'];
const packages = [
    '6a3ccfc6-cc76-11e7-8974-cfcd479e782c',
    'cbbb8d01-63fc-4adf-9803-a3781839b6b6',
    '255adad7-2854-47d7-9aa4-c5e1750eb8ca',
    'b7bc9d8c-cb5f-4dc8-96da-13ce635053d1',
    'c60fa750-d5d2-11e7-8f78-23d147275a57',
    '1796d9a2-d5ee-11e7-b39f-71a145b86a18'
];





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
        fetch.once(JSON.stringify(mockData)).mockResponses(
            [JSON.stringify(mockPack)],
            [JSON.stringify(mockELA)],
            [JSON.stringify(mockMATH)],
            [JSON.stringify(mockDOK)],
            [JSON.stringify(mockPT)],
            [JSON.stringify(mockPT)]);
        const result = await importDocs();
        expect(fetch.mock.calls.length).toBe(7);
        expect(result).toBe(6);
    });
    it('returns valid data for db', async () => {
        fetch.once(JSON.stringify(mockData)).mockResponses(
            [JSON.stringify(mockPack)],
            [JSON.stringify(mockELA)],
            [JSON.stringify(mockMATH)],
            [JSON.stringify(mockDOK)],
            [JSON.stringify(mockPT)],
            [JSON.stringify(mockPT)]);
        const result = await importDbEntries();
        expect(fetch.mock.calls.length).toBe(7);
        expect(result).toEqual(JSON.stringify(mockDB, undefined, 4));
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
        expect(ELAresult).toEqual(claim);
        expect(MATHresult).toEqual(claim);
        expect(MATHAlt).toEqual(claim);
        expect(MATHAlt1).toEqual(claim);
    });

});

