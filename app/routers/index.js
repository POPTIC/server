const Router = require('koa-router');

let router = new Router();

const logRegRouter = require('./router/LogRegRouter.js');
const userRouter = require('./router/UserRouter.js')

router.use(logRegRouter.routes());
router.use(userRouter.routes());
module.exports = router;