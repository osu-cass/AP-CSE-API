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
        this.uri = `${args.url}:${args.port}/${args.dbName}`;
        this.dbName = args.dbName;
    }

    // tslint:disable:no-floating-promises
    public async connect(): Promise<void> {
        let client: MongoClient;
        try {
            client = await MongoClient.connect(this.uri, { auth: { user: 'root', password: 'example' } });
            this.db = client.db(this.dbName);
        } catch (err) {
            throw err;
        }
    }
    public async insert(json: object[]) {
        let result;
        let collections;
        if (this.db) {
            try {
                collections = await this.db.collections();
                if(collections.find(collection => collection.collectionName === 'claims')) {
                    this.db.dropCollection('claims');
                }
                this.db.createCollection('claims');
                result = await this.db.collection('claims').insertMany(json);
            } catch (err) {
                throw err;
            }

            return result;
        }
    }

    public getBySearchParam(param: string): void {
        return;
    }

    public getByFilter(filter: string): void {
        return;
    }
}