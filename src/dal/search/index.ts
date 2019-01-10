import { Client, SearchResponse } from 'elasticsearch';
import { IClaim } from '../../models/claim';
import { IQueryParams } from '../../routes';
import bodybuilder, { Bodybuilder, QuerySubFilterBuilder } from 'bodybuilder';
import { Health } from '../../routes/health';
import { mappings } from '../../utils/static';
import { buildSearchResults } from '../helpers/index';

const fields: string[] = [
  'target.description',
  'target.evidence.evTitle',
  'target.evidence.evDesc',
  'target.stem.stemDesc',
  'target.stem.shortStem'
];

export interface ISearchClientOptions {
  host: string;
}
export interface ISearchClient {
  insertDocuments(claims: IClaim[]): Promise<void>;
  insert(claims: IClaim[]): Promise<void>;
  createIndex(): Promise<void>;
  deleteIndex(): Promise<void>;
  mapIndex(): Promise<void>;
  search(query: IQueryParams): Promise<IClaim[]>;
}

/**
 * Wrapper class for the elastic search client
 */
export class SearchClient implements ISearchClient {
  private client: Client;

  constructor(opts: ISearchClientOptions) {
    this.client = new Client({
      host: opts.host,
      log: 'info',
      requestTimeout: 120000,
      apiVersion: '6.3'
    });
  }

  public async ping(): Promise<Health> {
    let result: Health = Health.bad;
    try {
      result = (await this.client.ping({})) === true ? Health.good : Health.bad;
    } catch (err) {
      result = Health.bad;
    }

    return result;
  }

  public buildRequestBody(q: IQueryParams): object {
    const { query, subject, grades, claimNumber, targetShortCode }: IQueryParams = q;
    const body: Bodybuilder = bodybuilder();

    if (subject) {
      body.query('match', 'subject', subject);
    }

    if (grades) {
      body.size(100).query('bool', {
        should: grades.split(',').map((grade: string) => ({ match: { grades: grade } }))
      });
    }

    if (claimNumber) {
      body.query('match', 'claimNumber', claimNumber);
    }

    if (targetShortCode) {
      body.query('nested', { path: 'target', inner_hits: {} }, (q: QuerySubFilterBuilder) =>
        q.query('match', 'target.shortCode', targetShortCode)
      );
    }

    if (query) {
      body.query('nested', { path: 'target', inner_hits: {} }, (q: QuerySubFilterBuilder) =>
        q.query('multi_match', {
          query,
          fields,
          type: 'phrase'
        })
      );
    }

    return body.build();
  }

  /**
   * Inserts an array of `IClaim` into the elasticsearch instance
   * @param claims
   */
  public async insertDocuments(claims: IClaim[]): Promise<void> {
    for (const claim of claims) {
      const { shortCode } = claim;
      try {
        await this.client.index({
          id: shortCode,
          index: 'cse',
          type: 'claim',
          body: claim
        });
      } catch (err) {
        throw err;
      }
    }
  }

  /**
   * Removes any existing indices from elasticsearch
   * before reinitializing the index and mapping. Then
   * the typed documents are inserted.
   * @param claims
   */
  public async insert(claims: IClaim[]): Promise<void> {
    try {
      if (await this.client.indices.exists({ index: 'cse' })) {
        await this.deleteIndex();
      }
      await this.createIndex();
      await this.mapIndex();
      await this.insertDocuments(claims);
    } catch (err) {
      throw err;
    }
  }

  /**
   *  Deletes the `cse` index in elasticsearch
   */
  public async deleteIndex(): Promise<void> {
    try {
      await this.client.indices.delete({
        index: 'cse'
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   *  Creates the index in elasticsearch for `cse`
   */
  public async createIndex(): Promise<void> {
    try {
      await this.client.indices.create({
        index: 'cse'
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Creates the mapping in elasticsearch for type `claim` with
   * the nested type, `target`
   */
  public async mapIndex(): Promise<void> {
    try {
      await this.client.indices.putMapping({
        index: 'cse',
        type: 'claim',
        body: mappings
      });
    } catch (err) {
      throw err;
    }
  }

  public async search(query: IQueryParams): Promise<IClaim[]> {
    let result: IClaim[] = [];
    const body = this.buildRequestBody(query);
    try {
      const response: SearchResponse<{}> = await this.client.search({
        body,
        type: 'claim',
        index: 'cse'
      });
      result = buildSearchResults(response, query);
    } catch (err) {
      throw err;
    }

    return result;
  }
}
