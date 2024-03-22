const Router = require('koa-router');

let router = new Router();

const loginRouter = require('./router/loginRouter.js');
const userRouter = require('./router/userRouter.js')
const registerRouter = require('./router/registerRouter.js')

router.use(loginRouter.routes());
router.use(userRouter.routes());
router.use(registerRouter.routes());
module.exports = router;