import { Client, SearchResponse, ExistsParams } from 'elasticsearch';
import { IClaim } from '../../models/claim';
import { IQueryParams } from '../../routes';
import bodybuilder, { Bodybuilder } from 'bodybuilder';
import { Health } from '../../routes/health/index';

export interface ISearchClientOptions {
  host: string;
}
export interface ISearchClient {
  insertDocuments(claims: IClaim[]): Promise<void>;
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
      apiVersion: '6.3'
    });
  }

  private async documentExists(id: string): Promise<boolean> {
    let exists: boolean;
    const existsParams: ExistsParams = {
      id,
      index: `cse`,
      type: `claim`
    };

    try {
      // tslint:disable-next-line:no-unsafe-any
      exists = await this.client.exists(existsParams);
    } catch (err) {
      throw err;
    }

    return exists;
  }

  private async deleteDocument(id: string): Promise<void> {
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

  public async ping(): Promise<Health> {
    try {
      return (await this.client.ping({})) === true ? Health.good : Health.bad;
    } catch (err) {
      if (err) {
        return Health.bad;
      }
    }

    return Health.bad;
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
      body.query('multi_match', {
        query,
        type: 'phrase_prefix',
        fields: [
          'description',
          'target.description',
          'target.evidence.evTitle',
          'target.evidence.evDesc',
          'target.stem.stemDesc',
          'target.stem.shortStem'
        ]
      });
    }

    return body.build();
  }

  public async insertDocuments(claims: IClaim[]): Promise<void> {
    for (const claim of claims) {
      const { claimNumber } = claim;
      try {
        if (await this.documentExists(claimNumber)) {
          await this.deleteDocument(claimNumber);
        }
        await this.client.create({
          id: claimNumber,
          index: `cse`,
          type: `claim`,
          body: claim
        });
      } catch (err) {
        throw err;
      }
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
