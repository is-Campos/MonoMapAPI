import mongoose from "mongoose";

interface ConnectionOptions {
  mongoURL: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    try {
      "entra al try"
      await mongoose.connect(options.mongoURL, {
        dbName: options.dbName,
      });
      console.log("Connected succesfuly to db");
    } catch (error) {
      console.log(" Error connecting to db");
      console.log(error);
    }
  }
}
