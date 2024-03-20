const Router = require('koa-router');
const userController = require('../../controller/userController');

let userRouter = new Router();

userRouter.post('/user/getInfo', userController.GetUserInfo)
          .post('/user/getImgUrl', userController.GetUserImgURL)
          // 这里对路由方法进行了注册，如果对某个url的请求方法没有在这里注册（如delete等）则会报405错误

module.exports = userRouter;