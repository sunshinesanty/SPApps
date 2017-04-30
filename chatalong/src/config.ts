import { Db } from 'mongodb'

interface IConfig {
    MONGO_URL: string;
    dbInstance?: Db;
}
const AppConfig: IConfig = {
    MONGO_URL: 'mongodb://admin:Melbourne1@ds147480.mlab.com:47480/chat',
    dbInstance: undefined
}



export default AppConfig;