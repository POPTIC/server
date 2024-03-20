const jwt = require('jsonwebtoken');
const { Keys } = require('../config/serverConfig');
const { NO_TOKEN,TOKEN_INVALID } = require("../config/StateConfig");

module.exports = async (ctx, next) => {
    if (ctx.url.startsWith('/user/')) {
        const token = ctx.headers.authorization;
        if (!token) {
            ctx.status = 401;
            ctx.body = {
                code: NO_TOKEN,
                msg: '没有身份认证信息'
            };

            return;
        }
        try {
            const decoded = jwt.verify(token, Keys);
            ctx.state.user = decoded;

            await next();
        } catch (err) {
            ctx.status = 401;
            ctx.body = {
                code: TOKEN_INVALID,
                msg: '身份认证无效'
            };
        }
    }
    else {
        await next();
    }
};