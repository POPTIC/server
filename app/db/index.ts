import mysql from "mysql";
import dataBase from "@/config/dataBase";
import { logger } from "@/utils/default.log";
import mongoose from "mongoose";
mongoose
  .connect(dataBase.mongoConfig.MongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));
export const connectedMongo = mongoose;

const pool = mysql.createPool(dataBase.sqlConfig);
export const dataQuery = {
  query: function <T>(sql: string, params: any) {
    return new Promise<T>((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }
        connection.query(sql, params, (error, results, fields) => {
          if (error) {
            reject(error);
            return;
          }
          logger.info(`${sql} => ${params}`);
          connection.release();
          resolve(results);
        });
      });
    });
  },
};
