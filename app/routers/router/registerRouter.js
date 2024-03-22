const Router = require('koa-router');
const registerController = require('../../controller/registerController.js')

let registerRouter = new Router();

registerRouter.post('/register', registerController.register)
    .get('/register/isNameExist', registerController.isNameExist);

module.exports = registerRouter;