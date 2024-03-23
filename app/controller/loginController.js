const userDao = require('../dao/userDao.js');
const state = require('../config/StateConfig.js');
const crypto = require("crypto");
const createToken = require('../utils/createToken.js');

module.exports = {
    login: async ctx => {
        let { userName, password } = ctx.request.body;
        password = crypto.createHash('md5').update(password).digest('hex');
        let user = await userDao.check(userName, password);
        if (user.length === 0) {
            ctx.body = {
                code: state.USERNAME_PASSWORD_NOT_MATCH,
                message: '用户名或密码错误'
            }
            return;
        }
        else if (user.length === 1) {
            const token = createToken(user[0].user_name);
            ctx.body = {
                code: state.SUCCESS,
                message: '登录成功',
                data: {
                    token,
                    id: user[0].user_id,
                }
            }
            return;
        }
        else {
            ctx.body = {
                code: state.UNKNOW_ERROR,
                message: '未知错误'
            }
        }
    }
}