const db = require('../model/db.js');

module.exports = {
    getUserGalleyURL: async(id) => {
        const sql = 'select img_url from img where user_id = ?'
        return await db.query(sql, [id]);
    },
}