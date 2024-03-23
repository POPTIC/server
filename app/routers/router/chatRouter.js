const Router = require('koa-router');
const chatController = require('../../controller/chatController.');
let charRouter = new Router();

charRouter.post('/user/getMessage', chatController.getMessage)
    .post('/user/getFriendList', chatController.getFriendList);

module.exports = charRouter;