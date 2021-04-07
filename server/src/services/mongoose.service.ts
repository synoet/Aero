import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const host = process.env.DB_HOST || '3000'

export class MongooseService {
    private static instance: MongooseService;
    

    options = {
        autoIndex: false,
        poolSize: 10,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    count = 0;

    constructor() {
        this.connectWithRetry();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new MongooseService();
        }
        return this.instance;
    }

    getMongoose(){
        return mongoose;
    }
    

    connectWithRetry() {
        console.log('MongoDB connection with retry');
        mongoose.connect(host, this.options).then(() => {
            console.log('MongoDB is connected')
        }).catch(err => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++this.count, err, host);
            setTimeout(this.connectWithRetry, 5000)
        })
    };

}