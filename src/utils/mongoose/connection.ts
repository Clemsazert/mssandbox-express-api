/* eslint-disable prefer-destructuring */
import * as mongoose from 'mongoose';

const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PSW = process.env.DB_PSW;

const uri = `mongodb+srv://${DB_USER}:${DB_PSW}@${DB_CLUSTER}.clops.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export class MongoConnection {
  private db: mongoose.Mongoose | null;

  constructor() {
    this.db = null;
    this.connect();
  }

  connect = async (): Promise<void> => {
    try {
      this.db = await mongoose.connect(uri, { useNewUrlParser: true });
      console.log('Connection to db successfull.');
    } catch (err) {
      console.log(err);
    }
  };

  getDB = (): mongoose.Mongoose | null => this.db;
}

export const Connection = ((): MongoConnection => new MongoConnection())();
