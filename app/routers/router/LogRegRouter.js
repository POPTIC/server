const Router = require('koa-router');
const logRegController = require('../../controller/LogRegController.js')

let userRouter = new Router();

userRouter.post('/login', logRegController.Login)
          .post('/register', logRegController.Register)
          .get('/register/isNameExist', logRegController.IsNameExist);
          // 这里对路由方法进行了注册，如果对某个url的请求方法没有在这里注册（如delete等）则会报405错误

module.exports = userRouter;