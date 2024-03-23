const db = require('../db/mysql.js');

module.exports = {
  findUserName: async (userName) => {
    const sql = 'select * from users where user_name = ?';
    return await db.query(sql, [userName]);
  },
  check: async (userName, password) => {
    const sql = 'select * from users where user_name = ? and password = ?';
    return await db.query(sql, [userName, password]);
  },
  register: async (userName, password, email) => {
    const sql = 'insert into users values(null,?,?,?,null,null)';
    return await db.query(sql, [userName, password, email]);
  },
  getUserPassword: async (userName) => {
    const sql = 'select password from users where user_name = ?'
    return await db.query(sql, [userName]);
  },
  getUserInfo: async (id) => {
    const sql = 'select email,school,birthday from users where user_id = ?'
    return await db.query(sql, [id]);
  },
}