import { MongoClient, Db, Collection, InsertWriteOpResult, Cursor } from 'mongodb';
import { ITargetParams } from '../../routes/target';
import { IClaim } from '../../models/claim';
import { ITarget } from '../../models/target';

export interface IDbClientOptions {
  url: string;
  port: number;
  dbName: string;
}

export interface IDbClient {
  uri: string;
  dbName: string;
  connect(): Promise<void>;
  close(): Promise<void>;
  insert(documents: IClaim[]): Promise<InsertWriteOpResult>;
  getClaims(): Promise<IClaim[]>;
  getTarget(searchParams: ITargetParams): Promise<ITarget>;
}

/**
 * This class encapsulates and handles communication with Elasticsearch and
 * MongoDB.
 */
export class DbClient implements IDbClient {
  public uri: string;
  public dbName: string;
  private client?: MongoClient;
  private db?: Db;

  constructor(args: IDbClientOptions) {
    this.uri = `${args.url}:${args.port}`;
    this.dbName = args.dbName;
  }

  public async connect(): Promise<void> {
    try {
      this.client = await MongoClient.connect(this.uri, {
        auth: { user: 'root', password: 'example' }
      });
      this.db = this.client.db(this.dbName);
    } catch (err) {
      throw err;
    }
  }

  public async close(): Promise<void> {
    if (this.client) {
      try {
        await this.client.close();
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error('client is already closed');
    }
  }

  public async insert(documents: IClaim[]): Promise<InsertWriteOpResult> {
    let result: InsertWriteOpResult;
    if (this.db) {
      try {
        // tslint:disable-next-line:no-any
        const collections: Collection<any>[] = await this.db.collections();
        if (collections && collections.find(collection => collection.collectionName === 'claims')) {
          await this.db.dropCollection('claims');
        }
        await this.db.createCollection('claims');
        result = await this.db.collection('claims').insertMany(documents);
        await this.db.collection('claims').createIndex({
          claimNumber: 'text',
          subject: 'text',
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

  public async getClaims(): Promise<IClaim[]> {
    let result: IClaim[];
    if (this.db) {
      try {
        const dbResult: Cursor<IClaim> = this.db
          .collection('claims')
          .find({}, { projection: { _id: 0 } });
        result = await dbResult.toArray();
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('db is not defined');
    }

    return result;
  }

  public async getTarget(searchParams: ITargetParams): Promise<ITarget> {
    const { subject, grades, claimNumber, targetShortCode } = searchParams;
    let result: ITarget | undefined;
    if (this.db) {
      try {
        const dbResult: IClaim = await this.db.collection('claims').findOne({
          subject,
          grades,
          claimNumber,
          'target.shortCode': targetShortCode
        }) as IClaim;
        result = dbResult.target.find(t => t.shortCode === targetShortCode);
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('db is not defined');
    }

    return <ITarget>result;
  }
}
