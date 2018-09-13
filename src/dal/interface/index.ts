import { MongoClient, Db, Collection, InsertWriteOpResult, Cursor } from 'mongodb';
import { ITargetParams } from '../../routes/target/index';

export interface IDbClient {
    url: string;
    port: number;
    dbName: string;
}

/**
 * This class encaspulates and handles communication with Elasticsearch and
 * MongoDB.
 */
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
        // tslint:disable-next-line:no-any
        let collections: Collection<any>[];
        if (this.db) {
            try {
                collections = await this.db.collections();
                if(collections && collections.find(collection => collection.collectionName === 'claims')) {
                    await this.db.dropCollection('claims');
                }
                this.db.createCollection('claims');
                result = await this.db.collection('claims').insertMany(json);
            } catch (error) {
                throw error;
            }

            return result;
        } else {
            throw new Error('db is not defined');
        }
    }

    // tslint:disable-next-line:no-any
    public async getTargets(searchParams: ITargetParams): Promise<any> {
        const { subject, grades, claim, target } = searchParams;
        // tslint:disable-next-line:no-any
        let results: any;

        if (this.db) {
            try {
                results = await this.db.collection('claims').find({
                    subject,
                    grades
                }).toArray();
            } catch (error) {
                throw error;
            }
        }

        return results;
    }

    public getBySearchParam(param: string): void {
        return;
    }

}