const db = require('../model/db.js');

module.exports = {
    GetUserGalleyURL: async(id) => {
        const sql = 'select img_url from img where user_id = ?'
        return await db.query(sql, [id]);
    },
}