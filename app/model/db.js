var mysql = require('mysql');
const dataBaseConfig = require('../config/dataBaseConfig.js');

var pool = mysql.createPool(dataBaseConfig); // 创建连接池

var dataBase = {};

// 创建查询语句
dataBase.query = function (sql, params) {
    // sql: sql语句
    // param: 查询参数
  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, function (error, results, fields) {
        console.log(`${ sql }=>${ params }`);
        // 释放连接
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
// 导出对象
module.exports = dataBase;