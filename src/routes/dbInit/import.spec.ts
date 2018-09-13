// tslint:disable-next-line
import fetch from 'jest-fetch-mock';
jest.setMock('node-fetch', fetch);
import { importDbEntries, getClaimShortCode, getClaim, importDocs, fetchAllDocs } from './import';
import fs from 'fs';
import { mockData } from './__mocks__/mockAllDocs';
import { mockPack } from './__mocks__/mockPackage';
import { mockELA } from './__mocks__/mockELA';
import { mockMATH } from './__mocks__/mockMATH';
import { mockDOK } from './__mocks__/mockDOK';
import { mockDB } from './__mocks__/mockDBEntry';
const subject: string = 'English Language Arts';
const claim: string = 'C1';
const grade: string = '3';
const title: string = 'English Language Arts Specification: Grade 3 Claim 1 Target 1';
const shortCode: string = 'E.G3.C1';
const packages = [
    '6a3ccfc6-cc76-11e7-8974-cfcd479e782c',
    'cbbb8d01-63fc-4adf-9803-a3781839b6b6',
    '255adad7-2854-47d7-9aa4-c5e1750eb8ca',
    'b7bc9d8c-cb5f-4dc8-96da-13ce635053d1',
];





describe('Case API Scraper', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('fetches All Documents', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockData));
        const result = await fetchAllDocs();
        expect(fetch.mock.calls.length).toBe(1);
       expect(result).toEqual(packages);
    });
    it('imports a claim document', async () => {
        fetch.once(JSON.stringify(mockData)).mockResponses([JSON.stringify(mockPack)], [JSON.stringify(mockELA)], [JSON.stringify(mockMATH)], [JSON.stringify(mockDOK)]);
        const result = await importDocs();
        expect(fetch.mock.calls.length).toBe(5);
        expect(result).toBe(4);
    });
    it('returns valid data for db', async () => {
        fetch.once(JSON.stringify(mockData)).mockResponses([JSON.stringify(mockPack)], [JSON.stringify(mockELA)], [JSON.stringify(mockMATH)], [JSON.stringify(mockDOK)]);
        const result = await importDbEntries();
        expect(fetch.mock.calls.length).toBe(5);
        expect(result).toEqual(JSON.stringify(mockDB, undefined, 4));
    });
    it('makes shortcodes', () => {
        const result = getClaimShortCode(subject, claim, grade);
        expect(result).toEqual(shortCode);
    });
    it('gets the claim from the document title', () => {
        const result = getClaim(title, subject, grade);
        expect(result).toEqual(claim);
    });

});

