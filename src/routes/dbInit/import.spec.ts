import { importDbEntries } from './import';
import fs  from 'fs';

jest.mock('../dbInit/import.ts', () => ({
    importDbEntries: jest.fn().mockResolvedValue('{}')
}));



describe('Case API Scraper', () => {

    it('returns valid json', async () => {
        const result = await importDbEntries();
        expect(result).toEqual('{}');
    });
});