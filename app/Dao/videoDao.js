const db = require('../model/db.js');
module.exports = {
    getUserVideoInfo: async(id) => {
        const sql = 'select ? from video LIMIT 5'
        return await db.query(sql, [id]);
    },
    getCoverVideoInfo: async(id) => {
        const sql = 'select id from video where user_id = ?'
        return await db.query(sql, [id]);
    }
}