import { MongoClient, Db, Collection, InsertWriteOpResult } from 'mongodb';

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
            client = await MongoClient.connect(this.uri, { auth: { user: 'root', password: 'example' } });
            this.db = client.db(this.dbName);
        } catch (err) {
            throw err;
        }  
    }

    public async insert(json: object[]): Promise<InsertWriteOpResult> {
        let result: InsertWriteOpResult;
        // tslint:disable:no-any
        let collections: Collection<any>[];
        if (this.db) {
            try {
                collections = await this.db.collections();
                if(collections && collections.find(collection => collection.collectionName === 'claims')) {
                    await this.db.dropCollection('claims');
                }
                this.db.createCollection('claims');
                result = await this.db.collection('claims').insertMany(json);
            } catch (err) {
                throw err;
            }

            return result;
        }else{
            throw new Error('db is not defined');
        }
    }

    public getBySearchParam(param: string): void {
        return;
    }

    public getByFilter(filter: string): void {
        return;
    }
}