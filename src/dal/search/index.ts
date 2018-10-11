import { Client, SearchResponse, ExistsParams } from 'elasticsearch';
import { IClaim } from '../../models/claim';

export interface ISearchClientOptions {
  host: string;
}
export interface ISearchClient {
  insertDocuments(claims: IClaim[]): Promise<void>;
  search(q: string): Promise<void>;
}

/**
 * Wrapper class for the elastic search client
 */
export class SearchClient implements ISearchClient {
  private client: Client;

  constructor(opts: ISearchClientOptions) {
    this.client = new Client({
      host: opts.host
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

  public async search(q: string): Promise<void> {
    let result: SearchResponse<{}>;
    try {
      result = await this.client.search({
        q,
        index: `cse`,
        type: `claim`
      });
    } catch (err) {
      throw err;
    }
  }
}
