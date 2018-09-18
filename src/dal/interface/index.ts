import { MongoClient, Db, Collection, InsertWriteOpResult, Cursor } from 'mongodb';
import { ITargetParams } from '../../routes/target';
import { IClaim } from '../../models/claim';
import { ITarget } from '../../models/target';

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
                this.db.collection('claims').createIndex({
                    'claimNumber': 'text',
                    'subject': 'text',
                    'target.shortCode': 'text'
                });
            } catch (err) {
                throw err;
            }

            return result;
        } else {
            throw new Error('db is not defined');
        }
    }

    public async getTarget(searchParams: ITargetParams): Promise<ITarget> {
        const { subject, grades, claimNumber, targetShortCode } = searchParams;
        let result: ITarget | undefined;
        if (this.db) {
            try {
                const dbResult: IClaim = await this.db.collection('claims').findOne({
                    subject, grades, claimNumber,
                    'target.shortCode': targetShortCode }) as IClaim;
                result = dbResult.target.find(t => t.shortCode === targetShortCode);
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error('db is not defined');
        }

        return <ITarget>result;
    }

    public getBySearchParam(param: string): void {
        return;
    }

}