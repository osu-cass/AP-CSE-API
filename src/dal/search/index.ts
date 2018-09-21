import { Client, SearchResponse } from 'elasticsearch';
import { IClaim } from '../../models/claim';

export interface ISearchClient {
    host: string;
    insertDocuments(claims: IClaim[]): Promise<void>;
    search(q: string): Promise<void>;
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
        });
    }

    private async exists(id: string): Promise<boolean> {
        let exists: boolean;
        try {
            // tslint:disable-next-line:no-unsafe-any
            exists = await this.client.exists({
                id,
                index: `cse`,
                type: `claim`,
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
                type: `claim`,
            });
        } catch (err) {
            throw err;
        }
    }

    public async insertDocuments(claims: IClaim[]): Promise<void> {
        let id = 0;
        for(const claim of claims) {
            try {
                if(await this.exists(`${id}`)) {
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

    public async search(q: string): Promise<void> {
        let result: SearchResponse<{}>;
        try {
            result = await this.client.search({
                q,
                index: `cse`,
                type: `claim`,
            });
        } catch (err) {
            throw err;
        }
    }
}

