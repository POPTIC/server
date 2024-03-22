const Koa = require('koa');
const { PORT, STATIC_ARTICLE_DIR, STATIC_VIDEO_DIR, STATIC_PICTURE_DIR } = require('./config/ServerConfig.js');
let app = new Koa();

// 错误处理配置
const error = require('./middleware/error.js');
app.use(error);

// 跨域访问配置
const cors = require('koa2-cors');
app.use(cors());

// 静态资源路由配置
const KoaStatic = require("koa-static");
app.use(KoaStatic(STATIC_ARTICLE_DIR));
app.use(KoaStatic(STATIC_VIDEO_DIR));
app.use(KoaStatic(STATIC_PICTURE_DIR));

// jwt验证
const koajwt = require('koa-jwt');
const { KEYS } = require('./config/ServerConfig.js')
console.log(KEYS);
app.use(koajwt({
  secret: KEYS,
  debug: true
}).unless({
  path: [/\/register/, /\/login/, /\/public/]
}))

// 处理请求体数据
const { koaBody } = require('koa-body');
const koaBodyConfig = require('./config/KoaBodyConfig.js');
app.use(koaBody(koaBodyConfig));


// 路由中间件加载
const Routers = require('./routers/index.js');
app.use(Routers.routes()).use(Routers.allowedMethods());

app.listen(PORT, () => {
  console.log(`服务器启动在${PORT}端口`);
});
module.exports = app;