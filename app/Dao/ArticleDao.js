const db = require('../model/db.js');

module.exports = {
  // 连接数据库根据用户名和密码查询用户信息
  FindAllArticle: async (userId) => {
    const sql = 'select article_url from article where userId = ?';
    return await db.query(sql, [userId]);
  },
  GetUserArticle: async(id) => {
    const sql = 'select id from article where userId = ?'
    return await db.query(sql, [id]);
  },
}