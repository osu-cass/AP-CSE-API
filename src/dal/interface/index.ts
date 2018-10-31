import { MongoClient, Db, Collection, InsertWriteOpResult } from 'mongodb';
import { ITargetParams } from '../../routes';
import { IClaim } from '../../models/claim';
import { Health } from '../../routes/health';
import {
  IFilterOptions,
  IFilterItem,
  IClaimNumberResult,
  IGradeAndSubjectResult,
  ITargetShortCodeResult,
  IShortCodeResult
} from '../../models/filter';

export interface Hash {
  [key: string]: string | undefined;
  data?: string;
}
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
  buildSubjectsAndGrades(res: IGradeAndSubjectResult): IFilterOptions;
  getSubjectsAndGrades(): Promise<IFilterOptions | undefined>;
  getClaimNumbers(grade: string, subject: string): Promise<IFilterOptions | undefined>;
  getTargetShortCodes(
    grade: string,
    subject: string,
    claimNumber: string
  ): Promise<IFilterOptions | undefined>;
  getClaims(): Promise<IClaim[]>;
  getTarget(searchParams: ITargetParams): Promise<IClaim>;
}

/**
 * This class encapsulates and handles communication with Elasticsearch and
 * MongoDB.
 */
export class DbClient implements IDbClient {
  public uri: string;
  public dbName: string;
  public client?: MongoClient;
  public db?: Db;

  constructor(args: IDbClientOptions) {
    this.uri = `${args.url}:${args.port}`;
    this.dbName = args.dbName;
  }

  public async ping(): Promise<Health> {
    setTimeout(() => Health.bad, 5000);
    try {
      await this.connect();
    } catch (err) {
      return Health.bad;
    }
    if (this.db === undefined) {
      return Health.bad;
    }
    const result = await this.db.command({ ping: 1 });
    // tslint:disable-next-line: no-any no-unsafe-any
    if (result.ok === 1) {
      return Health.good;
    }

    return Health.busy;
  }

  public async connect(): Promise<void> {
    try {
      this.client = await MongoClient.connect(
        this.uri,
        {
          auth: { user: 'root', password: 'example' }
        }
      );
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
        throw new Error('error occured closing client');
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

  public buildSubjectsAndGrades(res: IGradeAndSubjectResult): IFilterOptions {
    const gradeHash: Hash = {};
    let gradeArr: string[] = [];
    let grades: IFilterItem[] = [];
    let subject: IFilterItem[] = [];

    if (res.grades) {
      // flatten
      res.grades.forEach(g => (gradeArr = gradeArr.concat(g)));
      // reduce to distinct members
      grades = gradeArr
        .filter((grade: string) => {
          if (!gradeHash[grade]) {
            gradeHash[grade] = grade;

            return true;
          }

          return false;
        })
        .sort((lhs: string, rhs: string) => parseInt(lhs, 10) - parseInt(rhs, 10))
        .map(g => ({ code: g, label: g }));
    }

    if (res.subject) {
      subject = res.subject.map(s => ({ code: s, label: s }));
    }

    return { subject, grades };
  }

  public async getSubjectsAndGrades(): Promise<IFilterOptions | undefined> {
    let result: IFilterOptions | undefined;
    if (this.db) {
      try {
        const dbResult: IGradeAndSubjectResult[] = await this.db
          .collection('claims')
          .aggregate([
            {
              $group: {
                // tslint:disable-next-line:no-null-keyword
                _id: null,
                subject: { $addToSet: '$subject' },
                grades: { $addToSet: '$grades' }
              }
            }
          ])
          .toArray();
        result = this.buildSubjectsAndGrades(dbResult[0]);
      } catch (error) {
        throw new Error('failed to get subjects and grades');
      }
    } else {
      throw new Error('db is not defined');
    }

    return result;
  }

  public async getClaimNumbers(
    grades: string,
    subject: string
  ): Promise<IFilterOptions | undefined> {
    let result: IFilterOptions | undefined;
    const claimHash: Hash = {};
    if (this.db) {
      try {
        const g = grades.split(',');
        const dbResult: IClaimNumberResult[] = await this.db
          .collection('claims')
          .find(
            {
              subject,
              $or: g.map(grade => ({ grades: grade }))
            },
            { projection: { _id: 0, claimNumber: 1 } }
          )
          .toArray();

        result = {
          claimNumbers: dbResult
            .filter(({ claimNumber }: IClaimNumberResult) => {
              if (!claimHash[claimNumber]) {
                claimHash[claimNumber] = claimNumber;

                return true;
              }

              return false;
            })
            .map(({ claimNumber }: IClaimNumberResult) => ({
              code: claimNumber,
              label: claimNumber
            }))
        };
      } catch (error) {
        throw new Error('failed to get claim numbers');
      }
    } else {
      throw new Error('db is not defined');
    }

    return result;
  }

  public async getTargetShortCodes(
    grades: string,
    subject: string,
    claimNumber: string
  ): Promise<IFilterOptions | undefined> {
    let result: IFilterOptions | undefined;
    if (this.db) {
      try {
        const g: string[] = grades.split(',');
        const dbResult: ITargetShortCodeResult[] = await this.db
          .collection('claims')
          .find(
            {
              subject,
              claimNumber,
              $or: g.map(grade => ({ grades: grade }))
            },
            { projection: { _id: 0, 'target.shortCode': 1 } }
          )
          .toArray();
        const flatResult: IShortCodeResult[] = [];
        dbResult.forEach((res: ITargetShortCodeResult) => flatResult.push(...res.target));
        result = {
          targetShortCodes: flatResult
            .filter(({ shortCode }: IShortCodeResult) => {
              let included = false;
              for (const grade of g) {
                included = grade.match(/^[9]|1[0-2]$/)
                  ? shortCode.includes('HS')
                  : shortCode.includes(`G${grade}`);
                if (included) {
                  return included;
                }
              }

              return false;
            })
            .map(({ shortCode }: IShortCodeResult) => ({ code: shortCode, label: shortCode }))
        };
      } catch (err) {
        throw new Error('failed to get target short codes');
      }
    } else {
      throw new Error('db is not defined');
    }

    return result;
  }

  public async getClaims(): Promise<IClaim[]> {
    let result: IClaim[];
    if (this.db) {
      try {
        result = await this.db
          .collection('claims')
          .find({}, { projection: { _id: 0 } })
          .toArray();
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('db is not defined');
    }

    return result;
  }

  public async getTarget(searchParams: ITargetParams): Promise<IClaim> {
    const { subject, grades, claimNumber, targetShortCode } = searchParams;
    let result: IClaim | undefined;
    if (this.db) {
      try {
        result = (await this.db.collection('claims').findOne({
          subject,
          grades,
          claimNumber,
          'target.shortCode': targetShortCode
        })) as IClaim;
        result.target = result.target.filter(t => t.shortCode === targetShortCode);
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('db is not defined');
    }

    return result;
  }
}
