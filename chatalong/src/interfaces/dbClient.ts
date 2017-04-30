import { MongoClient, Db } from 'mongodb';
import Config from '../config'

export const ConnectDB = (): Promise<Db> => {
    return new Promise<Db>((resolve, reject) => {
        MongoClient.connect(Config.MONGO_URL, (error: any, dbInst: Db) => {
            if (error) reject(error);
            resolve(dbInst);
        })
    });
}