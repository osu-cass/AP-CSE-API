import { MongoClient, Db, MongoError } from 'mongodb';

export interface IDbClient {
    url: string;
    port: number;
    dbName: string;
}

export class DbClient {
    private uri: string;
    private db?: Db;

    constructor(args: IDbClient) {
        this.uri = `${args.url}/${args.port}`;
        MongoClient.connect(this.uri, (err: MongoError, client: MongoClient) => {
            if(err) {
                throw err;
            }
            try {
                this.db = client.db(args.dbName);
            } catch (err) {
                console.error(err.message);
            }
            client.close();
        });
    }

    public getBySearchParam(param: string): void {
        return;
    }

    public getByFilter(filter: string): void {
        return;
    }
}