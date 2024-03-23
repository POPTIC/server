const { KEYS,TOKEN_EXPIRES_TIEM } = require('../config/serverConfig')
const jwt = require('jsonwebtoken');
module.exports = function (name) {
    return jwt.sign(
        {
            userName: name
        },
        KEYS,
        { expiresIn: TOKEN_EXPIRES_TIEM }
    );
}