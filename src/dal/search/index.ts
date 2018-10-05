import { Client, SearchResponse } from 'elasticsearch';
import { IClaim } from '../../models/claim';
import { ITarget } from '../../models/target';
import { ITargetParams } from '../../routes';
import bodybuilder, { Bodybuilder } from 'bodybuilder';

export interface ISearchClient {
  host: string;
  insertDocuments(claims: IClaim[]): Promise<void>;
  search(q: string, target?: ITargetParams): Promise<IClaim[]>;
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

  private buildRequestBody(query?: string, target?: ITargetParams): object {
    const body: Bodybuilder = bodybuilder();

    if(target && target.subject) {
      body.query('match', 'subject', target.subject);
    }

    if(target && target.grades) {
      body.query('match', 'grades', target.grades);
    }

    if(target && target.claimNumber) {
      body.query('match', 'claimNumber', target.claimNumber);
    }

    if(target && target.targetShortCode) {
      body.query('match', 'target.shortCode', target.targetShortCode);
    }

    if(query) {
      body.query('multi_match', {type: 'phrase_prefix'}, {query});
    }

    return body.build();
  }

  // remove this when elasticsearch can filter
  private getTargets(response: SearchResponse<{}>, target?: ITargetParams): ITarget[] {
    let result: ITarget[] = [];
    if (target) {
      // tslint:disable:no-any no-unsafe-any
      if(target.subject) {
        response.hits.hits = response.hits.hits.filter((hit: any) => {
          return hit._source.subject === target.subject;
        });
      }

      if(target.grades) {
        response.hits.hits = response.hits.hits.filter((hit: any) => {
          hit._source.grades.includes(target.grades);
        });
      }

      if(target.claimNumber) {
        response.hits.hits = response.hits.hits.filter((hit: any) =>
          hit._source.claimNumber === target.claimNumber
        );
      }

      if(target.targetShortCode) {
        response.hits.hits = response.hits.hits.filter((hit: any) =>
          hit._source.targetShortCode === target.targetShortCode
        );
      }
    }

    response.hits.hits.forEach((hit: any) => {
      result = result.concat(<ITarget[]>hit._source.target);
    });
    // tslint:enable:no-any no-unsafe-any

    return result;
  }

  public async insertDocuments(claims: IClaim[]): Promise<void> {
    for (const claim of claims) {
      try {
        if (await this.exists(claim.claimNumber)) {
          await this.delete(claim.claimNumber);
        }
        await this.client.create({
          id: claim.claimNumber,
          index: `cse`,
          type: `claim`,
          body: claim
        });
      } catch (err) {
        throw err;
      }
    }
  }

  public async search(q: string, target?: ITargetParams): Promise<IClaim[]> {
    let result: IClaim[] = [];
    let response: SearchResponse<{}>;
    try {
      response = await this.client.search({
        type: 'claim',
        index: 'cse',
        body: this.buildRequestBody(q, target)
      });
      result = response.hits.hits.map(hit => <IClaim>hit._source);
    } catch (err) {
      throw err;
    }

    return result;
  }

}
