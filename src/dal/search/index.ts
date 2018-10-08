import { Client, SearchResponse } from 'elasticsearch';
import { IClaim } from '../../models/claim';
import { IQueryParams } from '../../routes';
import bodybuilder, { Bodybuilder } from 'bodybuilder';

export interface ISearchClient {
  host: string;
  insertDocuments(claims: IClaim[]): Promise<void>;
  search(query: IQueryParams): Promise<IClaim[]>;
}

/**
 * Wrapper class for the elastic search client
 */
export class SearchClient implements ISearchClient {
  private client: Client;
  public host: string;

  constructor() {
    this.host = 'es-search:9200';
    this.client = new Client({
      host: this.host,
      log: 'info',
      apiVersion: '6.3'
    });
  }

  private async exists(id: string): Promise<boolean> {
    let exists: boolean;
    try {
      // tslint:disable-next-line:no-unsafe-any
      exists = await this.client.exists({
        id,
        index: `cse`,
        type: `claim`
      });
    } catch (err) {
      throw err;
    }

    return exists;
  }

  // tslint:disable-next-line:no-reserved-keywords
  private async delete(id: string) {
    try {
      await this.client.delete({
        id,
        index: `cse`,
        type: `claim`
      });
    } catch (err) {
      throw err;
    }
  }

  public buildRequestBody(q: IQueryParams): object {
    const { query, subject, grades, claimNumber, targetShortCode }: IQueryParams = q;
    const body: Bodybuilder = bodybuilder();

    if (subject) {
      body.query('match', 'subject', subject);
    }

    if (grades) {
      body.query('match', 'grades', grades);
    }

    if (claimNumber) {
      body.query('match', 'claimNumber', claimNumber);
    }

    if (targetShortCode) {
      body.query('match', 'target.shortCode', targetShortCode);
    }

    if (query) {
      body.query('multi_match', { query, type: 'phrase_prefix' });
    }

    return body.build();
  }

  public async insertDocuments(claims: IClaim[]): Promise<void> {
    let id = 0;
    for (const claim of claims) {
      try {
        if (await this.exists(`${id}`)) {
          await this.delete(`${id}`);
        }
        await this.client.create({
          id: `${id}`,
          index: `cse`,
          type: `claim`,
          body: claim
        });
      } catch (err) {
        throw err;
      }
      id++;
    }
  }

  public async search(query: IQueryParams): Promise<IClaim[]> {
    let result: IClaim[] = [];
    let response: SearchResponse<{}>;
    try {
      response = await this.client.search({
        type: 'claim',
        index: 'cse',
        body: this.buildRequestBody(query)
      });
      result = response.hits.hits.map(hit => <IClaim>hit._source);
    } catch (err) {
      throw err;
    }

    return result;
  }
}
