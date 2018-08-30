import { MongoClient, Db, MongoError } from 'mongodb';

export interface IDbClient {
    url: string;
    port: number;
    dbName: string;
}

// tslint:disable:completed-docs
export class DbClient {
    public uri: string;
    public dbName: string;
    private db?: Db;

    constructor(args: IDbClient) {
        this.uri = `${args.url}:${args.port}`;
        this.dbName = args.dbName;
    }

    // tslint:disable:no-floating-promises
    public async connect(): Promise<void> {
        let client: MongoClient;
        try {
            client = await MongoClient.connect(this.uri);
            this.db = client.db(this.dbName);
        } catch(err) {
            throw err;
        }
        client.close();
    }

    public getBySearchParam(param: string): void {
        return;
    }

    public getByFilter(filter: string): void {
        return;
    }
}