const userDao = require('../Dao/userDao.js');
const { USERNAME_REPEAT, USERNAME_PASSWORD_NOT_MATCH, UNKNOW_ERROR, SUCCESS, FORMATE_ERROR } = require('../config/StateConfig.js');
const crypto = require("crypto");
const createToken = require('../utils/createToken.js');

module.exports = {
    Login: async ctx => {
        let { userName, password } = ctx.request.body;
        // 这里的md5加密使用的是32位小写加密方式
        password = crypto.createHash('md5').update(password).digest('hex');
        let user = await userDao.Check(userName, password);
        if (user.length === 0) {
            ctx.body = {
                code: USERNAME_PASSWORD_NOT_MATCH,
                msg: '用户名或密码错误'
            }
            return;
        }
        else if (user.length === 1) {
            const token = createToken(user[0].user_name);
            ctx.body = {
                code: SUCCESS,
                msg: '登录成功',
                data: {
                    token,
                    id : user[0].user_id,
                }
            }
            return;
        }
        else {
            ctx.body = {
                code: UNKNOW_ERROR,
                msg: '未知错误'
            }
        }
    },
    Register: async ctx => {
        let { userName, password, email } = ctx.request.body;

        let user = await userDao.FindUserName(userName);

        if (user.length !== 0) {
            ctx.body = {
                code: USERNAME_REPEAT,
                msg: '用户名已经存在，不能注册'
            }
            return;
        }
        try {
            // 连接数据库插入用户信息
            password = crypto.createHash('md5').update(password).digest('hex');
            let registerResult = await userDao.Register(userName, password, email);
            // 操作所影响的记录行数为1,则代表注册成功
            if (registerResult.affectedRows === 1) {
                ctx.body = {
                    code: SUCCESS,
                    msg: '注册成功'
                }
                return;
            }
            ctx.body = {
                code: USERNAME_REPEAT,
                msg: '未知错误'
            }
        } catch (error) {
            ctx.body = {
                code: FORMATE_ERROR,
                msg: '格式错误'
            }
            return;
        }
    },
    IsNameExist: async ctx => {
        console.log(ctx.request);
        let userName = ctx.query.userName;
        // 如果使用get方法，参数存在于url的查询参数中，则可以使用ctx.query方法来获取参数
        let user = await userDao.FindUserName(userName);
        if (user.length !== 0) {
            ctx.body = {
                code: USERNAME_REPEAT,
                msg: '用户名重复'
            }
            return;
        }
        else {
            ctx.body = {
                code: SUCCESS,
                msg: '用户名不重复',
            }
            return;
        }
    }
}