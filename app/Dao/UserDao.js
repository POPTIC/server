const db = require('../model/db.js');

module.exports = {
  FindUserName: async (userName) => {
    const sql = 'select * from users where user_name = ?';
    return await db.query(sql, [userName]);
  },
  Check: async (userName, password) => {
    const sql = 'select * from users where user_name = ? and password = ?';
    return await db.query(sql, [userName, password]);
  },
  Register: async (userName, password, email) => {
    const sql = 'insert into users values(null,?,?,?,null,null)';
    return await db.query(sql, [userName, password, email]);
  },
  GetUserPassword: async (userName) => {
    const sql = 'select password from users where user_name = ?'
    return await db.query(sql, [userName]);
  },
  GetUserInfo: async (id) => {
    const sql = 'select email,school,birthday from users where user_id = ?'
    return await db.query(sql, [id]);
  },
}