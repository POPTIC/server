const { SUCCESS } = require('../config/StateConfig.js');
const ImageDao = require('../dao/imageDao.js');
const userDao = require('../dao/userDao.js');

module.exports = {
    getUserInfo: async ctx => {
        let { id } = ctx.request.body;
        let userInfo = await userDao.GetUserInfo(id);
        ctx.body = {
            code : SUCCESS,
            msg : "获取用户信息成功",
            data : userInfo,
        }
    },
    getUserImgURL: async ctx => {
        let { id } = ctx.request.body;
        let url = await ImageDao.GetUserGalleyURL(id);
        ctx.body = {
            code : SUCCESS,
            msg : "获取图片url成功",
            data : url,
        }
    }
}