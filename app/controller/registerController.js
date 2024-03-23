const userDao = require('../dao/userDao.js');
const state = require('../config/StateConfig.js');
const crypto = require("crypto");

module.exports = {
    register: async ctx => {
        let { userName, password, email } = ctx.request.body;
        let user = await userDao.FindUserName(userName);
        if (user.length !== 0) {
            ctx.body = {
                code: state.USERNAME_REPEAT,
                msg: '用户名已经存在，不能注册'
            }
            return;
        }
        try {
            password = crypto.createHash('md5').update(password).digest('hex');
            let registerResult = await userDao.Register(userName, password, email);
            if (registerResult.affectedRows === 1) {
                ctx.body = {
                    code: SUCCESS,
                    msg: '注册成功'
                }
                return;
            }
            ctx.body = {
                code: state.USERNAME_REPEAT,
                msg: '未知错误'
            }
        } catch (error) {
            ctx.body = {
                code: state.FORMATE_ERROR,
                msg: '格式错误'
            }
            return;
        }
    },
    isNameExist: async ctx => {
        console.log(ctx.request);
        let userName = ctx.query.userName;
        let user = await userDao.FindUserName(userName);
        if (user.length !== 0) {
            ctx.body = {
                code: state.USERNAME_REPEAT,
                msg: '用户名重复'
            }
            return;
        }
        else {
            ctx.body = {
                code: state.SUCCESS,
                msg: '用户名不重复',
            }
            return;
        }
    }
}