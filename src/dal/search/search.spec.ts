import { SearchClient } from '.';
import { esCreate, esDelete, esExists, esSearch } from '../../__mocks__/elasticsearch';
import { IClaim } from '../../models/claim';
import { IQueryParams } from '../../routes';
import { Health } from '../../routes/health';

describe('search', () => {
  describe('data insertion', () => {
    let client: SearchClient;
    const claims: Partial<IClaim>[] = [];

    beforeAll(() => {
      client = new SearchClient({ host: 'test-host:1234' });
      claims.push({
        shortCode: '0',
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
      expect(esDelete).toHaveBeenCalledTimes(1);
      expect(esCreate).toHaveBeenCalledWith({
        id: '0',
        index: 'cse',
        type: 'claim',
        body: claims[0]
      });
    });

    it('pings elasticsearch as bad', async () => {
      expect(await client.ping()).toBe(Health.bad);
      expect(await client.ping()).toBe(Health.good);
      expect(await client.ping()).toBe(Health.bad);
    });

    it('fails to insert claims into es', async () => {
      esCreate.mockRejectedValue(new Error('create error'));
      expect.assertions(4);
      try {
        await client.insertDocuments(<IClaim[]>claims);
      } catch (err) {
        expect(esExists).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
        expect(esDelete).toHaveBeenCalledTimes(1);
        expect(esCreate).toHaveBeenCalledWith({
          id: '0',
          index: 'cse',
          type: 'claim',
          body: claims[0]
        });
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
      expect(esCreate).toHaveBeenCalledWith({
        id: '0',
        index: 'cse',
        type: 'claim',
        body: claims[0]
      });
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

    it('fresh insert with no deletions', async () => {
      esExists.mockImplementation(() => false);
      expect.assertions(3);
      await client.insertDocuments(<IClaim[]>claims);
      expect(esExists).toHaveBeenCalledWith({ id: '0', index: 'cse', type: 'claim' });
      expect(esDelete).toHaveBeenCalledTimes(0);
      expect(esCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('search functionality', () => {
    let client: SearchClient;
    const claims: Partial<IClaim>[] = [];
    let testQuery: IQueryParams;
    let testBody: object;

    beforeAll(() => {
      esCreate.mockClear();
      esDelete.mockClear();
      esExists.mockClear();
      esSearch.mockClear();
      client = new SearchClient({ host: 'test-host:1234' });
      claims.push({
        title: 'test'
      });
      testQuery = {
        query: 'test string',
        subject: 'math',
        grades: ['5', '6'],
        claimNumber: 'C2',
        targetShortCode: 'M.G3.C1G.TK'
      };
      testBody = {
        query: {
          bool: {
            must: [
              {
                match: {
                  subject: testQuery.subject
                }
              },
              {
                match: {
                  grades: testQuery.grades
                }
              },
              {
                match: {
                  claimNumber: testQuery.claimNumber
                }
              },
              {
                match: {
                  'target.shortCode': testQuery.targetShortCode
                }
              },
              {
                multi_match: {
                  query: testQuery.query,
                  type: 'phrase_prefix',
                  fields: [
                    'description',
                    'target.description',
                    'target.evidence.evTitle',
                    'target.evidence.evDesc',
                    'target.stem.stemDesc',
                    'target.stem.shortStem'
                  ]
                }
              }
            ]
          }
        }
      };
    });

    it('returns result', async () => {
      expect.assertions(1);
      await client.search(testQuery);
      expect(esSearch).toHaveBeenCalledWith({ body: testBody, index: 'cse', type: 'claim' });
    });

    it('throws error', async () => {
      esSearch.mockRejectedValue(new Error('search failed'));
      expect.assertions(2);
      try {
        await client.search(testQuery);
      } catch (err) {
        expect(err).toEqual(new Error('search failed'));
        expect(esSearch).toHaveBeenCalledWith({ body: testBody, index: 'cse', type: 'claim' });
      }
    });
  });

  describe('builds requests', () => {
    let client: SearchClient;
    let testQuery: IQueryParams;

    beforeAll(() => {
      esCreate.mockClear();
      esDelete.mockClear();
      esExists.mockClear();
      esSearch.mockClear();
      client = new SearchClient({ host: 'test-host:1234' });
      testQuery = {
        query: 'test string',
        subject: 'math',
        grades: ['5', '6'],
        claimNumber: 'C2',
        targetShortCode: 'M.G3.C1G.TK'
      };
    });

    it('builds request with query parameters only', () => {
      const { query } = testQuery;
      expect.assertions(1);
      expect(client.buildRequestBody({ query })).toEqual({
        query: {
          multi_match: {
            query: 'test string',
            type: 'phrase_prefix',
            fields: [
              'description',
              'target.description',
              'target.evidence.evTitle',
              'target.evidence.evDesc',
              'target.stem.stemDesc',
              'target.stem.shortStem'
            ]
          }
        }
      });
    });

    it('builds request with filter parameters only', () => {
      const { subject, grades, claimNumber, targetShortCode } = testQuery;
      expect.assertions(1);
      expect(client.buildRequestBody({ subject, grades, claimNumber, targetShortCode })).toEqual({
        query: {
          bool: {
            must: [
              {
                match: {
                  subject: 'math'
                }
              },
              {
                match: {
                  grades: ['5', '6']
                }
              },
              {
                match: {
                  claimNumber: 'C2'
                }
              },
              {
                match: {
                  'target.shortCode': 'M.G3.C1G.TK'
                }
              }
            ]
          }
        }
      });
    });
  });
});
