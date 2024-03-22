const Router = require('koa-router');
const userController = require('../../controller/userController');

let userRouter = new Router();

userRouter.post('/user/getInfo', userController.getUserInfo)
    .post('/user/getImgUrl', userController.getUserImgURL)

module.exports = userRouter;