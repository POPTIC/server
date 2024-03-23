const Router = require('koa-router');
const loginController = require('../../controller/loginController.js')

let loginRouter = new Router();

loginRouter.post('/login', loginController.login)

module.exports = loginRouter;