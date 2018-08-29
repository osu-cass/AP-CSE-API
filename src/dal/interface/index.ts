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
        this.uri = `${args.url}:${args.port}`;
        MongoClient.connect(this.uri).then((client: MongoClient) => {
            try {
                this.db = client.db(args.dbName);
            } catch (err) {
                throw err;
            }
            client.close();
        }).catch((err: MongoError) => {
            throw err;
        });
    }

    // public getBySearchParam(param: string): void {
    //     return;
    // }

    // public getByFilter(filter: string): void {
    //     return;
    // }
}