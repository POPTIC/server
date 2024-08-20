require('module-alias/register');
import Koa from 'koa';
import { router } from './routers/index';
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import { logger } from './utils/default.log';
import { serverConfig } from './config/enviroment';
import path from 'path';
import { koaSwagger } from 'koa2-swagger-ui';
import author from '@/middleware/authorization';
import multer from 'koa-multer';

const staticDirPath = path.join(__dirname, 'public');

const app = new Koa();

app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json' // example path to json
    }
  })
);
app.use(serve(staticDirPath));
app.use(bodyParser());
app.use(author);
app.use(router.routes()).use(router.allowedMethods());
// const { Port, staticArticleDir, staticVideoDir, staticPictureDir } = require('./config/serverConfig.js');


// // 处理异常
// const error = require('./app/middleware/error');
// app.use(error);

// // 为静态资源请求重写url
// const rewriteUrl = require('./app/middleware/rewriteUrl');
// app.use(rewriteUrl);
// 使用koa-static处理静态资源

// 测试中间件 —— 鉴权前测试
// app.use(async (ctx, next) => {
//   console.log('111');
//   await next();
// })

// // session
// const {sessionConfig} = require('./config/sessionConfig.js') 
// app.keys = ['session app keys'];
// app.use(session(sessionConfig, app));

// 判断是否登录
// 登录判断中间件
// const Authorization = require('./middleware/Authorization.js')
// app.use(Authorization);

// app.use(async (ctx, next) => {
//   // const start = new Date()
//   console.log(ctx.request);
//   await next()
//   // const ms = new Date() - start
//   // 显式请求信息
//   console.log('----------back-----------------');
//   // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//   // console.log(ctx.header);
// })
// const cors = require('koa2-cors');
// app.use(cors());

// const KoaStatic = require("koa-static");
// app.use(KoaStatic(staticArticleDir));
// app.use(KoaStatic(staticVideoDir));
// app.use(KoaStatic(staticPictureDir));

// // jwt验证
// const koajwt = require('koa-jwt');
// const {Keys} = require('./config/serverConfig.js')
// console.log(Keys);
// app.use(koajwt({
//   secret: Keys,
//   debug: true
// }).unless({ // 配置白名单
//   path: [/\/register/, /\/login/, /\/public/]
// }))

// session验证
// app.use(async (ctx, next) => {
//   ctx.state.user = ctx.session.user;
//   await next();
// });

// 在router层这里才开始真正进行http请求参数解析，以及发送请求操作
// msg中间件，打印一些请求和响应信息

// 处理请求体数据
// const { koaBody } = require('koa-body');
// const koaBodyConfig = require('./config/koaBodyConfig.js');
// app.use(koaBody(koaBodyConfig));

app.listen(serverConfig.port, () => {
  logger.info(`Server started at http://localhost:${serverConfig.port}`);
});
