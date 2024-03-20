const db = require('../model/db.js');
module.exports = {
    GetUserVideoInfo: async(id) => {
        const sql = 'select id from video LIMIT 5'
        return await db.query(sql);
    },
    GetCoverVideoInfo: async(id) => {
        const sql = 'select id from video where user_id = ?'
        return await db.query(sql, [id]);
    }
}