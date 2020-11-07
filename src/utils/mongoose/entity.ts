import * as mongoose from 'mongoose';

import { Connection, MongoConnection } from './connection';

export class Entity<T extends mongoose.Document> {
  public model: mongoose.Model<T>;

  private connection: MongoConnection;

  constructor(schema: mongoose.Schema, name: string) {
    this.connection = Connection;
    const db = this.connection.getDB();
    this.model = db ? db.model(name, schema) : mongoose.model(name, schema);
  }

  getById = (id: string): Promise<T | null> => this.model.findById(id).exec();
}
