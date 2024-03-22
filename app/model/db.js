var mysql = require('mysql');
const dataBaseConfig = require('../config/DataBaseConfig.js');

var pool = mysql.createPool(dataBaseConfig); // 创建连接池

var dataBase = {};
/**
 * 
 * @param {string} sql - sql模板语句
 * @param {Array} params - sql模板参数
 * @returns 
 */
dataBase.query = function (sql, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, function (error, results, fields) {
        console.log(`${sql}=>${params}`);
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });
}

module.exports = dataBase;