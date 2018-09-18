import { Client } from 'elasticsearch';

/**
 * Wrapper class for the elastic search client
 */
export class SearchClient {
    private client: Client;

    constructor() {
        this.client = new Client({
            host: 'es-search:9200',
            log: 'trace'
        });
    }

    // public docExists() {

    // }
}

