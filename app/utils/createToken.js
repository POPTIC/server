const { Keys,tokenExpiresTime } = require('../config/serverConfig')
const jwt = require('jsonwebtoken');
module.exports = function (name) {
    return jwt.sign(
        // 第一个参数为负载
        {
            userName: name
        },
        // 第二个参数为密钥
        Keys,
        // 第三个参数为option 定义其他选项 —— 过期事件等
        { expiresIn: tokenExpiresTime }
    );
}