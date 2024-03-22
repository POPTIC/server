const db = require('../model/db.js');

module.exports = {

  findAllArticle: async (userId) => {
    const sql = 'select article_url from article where userId = ?';
    return await db.query(sql, [userId]);
  },
  getUserArticle: async(id) => {
    const sql = 'select id from article where userId = ?'
    return await db.query(sql, [id]);
  },
}