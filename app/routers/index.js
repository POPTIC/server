const Router = require('koa-router');

let router = new Router();

const userRouter = require('./router/userRouter.js')
const loginRouter = require('./router/loginRouter.js');
const registerRouter = require('./router/registerRouter.js')
const chatController = require('./router/chatRouter.js')
const videoController = require('./router/videoRouter.js')

router.use(userRouter.routes());
router.use(loginRouter.routes());
router.use(registerRouter.routes());
router.use(chatController.routes());
router.use(videoController.routes());

module.exports = router;