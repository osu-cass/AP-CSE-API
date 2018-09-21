import { SearchClient } from '.';
import { esCreate, esDelete, esExists, esSearch } from '../../__mocks__/elasticsearch';
import { IClaim } from '../../models/claim/index';

describe('search', () => {

    describe('data insertion', () => {
        let client: SearchClient;
        const claims: Partial<IClaim>[] = [];

        beforeAll(() => {
            client = new SearchClient();
            claims.push({
                title: 'test'
            });
        });

        beforeEach(() => {
            esCreate.mockClear();
            esDelete.mockClear();
            esExists.mockClear();
            esSearch.mockClear();
        });

        it('inserts claims into es', async () => {
            expect.assertions(3);
            await client.insertDocuments(<IClaim[]>claims);
            expect(esExists).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
            expect(esDelete).toHaveBeenCalledTimes(0);
            expect(esCreate).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim', body: claims[0] });
        });

        it('fails to insert claims into es', async () => {
            esCreate.mockRejectedValue(new Error('create error'));
            expect.assertions(4);
            try {
                await client.insertDocuments(<IClaim[]>claims);
            } catch (err) {
                expect(esExists).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
                expect(esDelete).toHaveBeenCalledTimes(0);
                expect(esCreate).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim', body: claims[0] });
                expect(err).toEqual(new Error('create error'));
            }
            esCreate.mockReset();
        });

        it('delete and insert claim into es', async () => {
            esExists.mockImplementation(() => true);
            expect.assertions(3);
            await client.insertDocuments(<IClaim[]>claims);
            expect(esExists).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
            expect(esDelete).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
            expect(esCreate).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim', body: claims[0] });
        });

        it('exists() throws error', async () => {
            esExists.mockRejectedValue(new Error('exist() failed'));
            expect.assertions(4);
            try {
                await client.insertDocuments(<IClaim[]>claims);
            } catch (err) {
                expect(err).toEqual(new Error('exist() failed'));
                expect(esExists).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
                expect(esDelete).toHaveBeenCalledTimes(0);
                expect(esCreate).toHaveBeenCalledTimes(0);
            }
        });

        it('delete() throws error', async () => {
            esExists.mockImplementation(() => true);
            esDelete.mockRejectedValue(new Error('delete() failed'));
            expect.assertions(4);
            try {
                await client.insertDocuments(<IClaim[]>claims);
            } catch (err) {
                expect(err).toEqual(new Error('delete() failed'));
                expect(esExists).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
                expect(esDelete).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
                expect(esCreate).toHaveBeenCalledTimes(0);
            }
        });

    });

    describe('search functionality', () => {
        let client: SearchClient;
        const claims: Partial<IClaim>[] = [];
        let testString: string;

        beforeAll(() => {
            client = new SearchClient();
            testString = 'test';
            claims.push({
                title: testString
            });
        });

        it('returns result', async () => {
            expect.assertions(1);
            await client.search(testString);
            expect(esSearch).toHaveBeenCalledWith({q: 'test', index: 'cse', type: 'claim'});
        });

        it('throws error', async () => {
            esSearch.mockRejectedValue(new Error('search failed'));
            expect.assertions(2);
            try {
                await client.search(testString);
            } catch (err) {
                expect(err).toEqual(new Error('search failed'));
                expect(esSearch).toHaveBeenCalledWith({q: 'test', index: 'cse', type: 'claim'});
            }
        });
    });

});