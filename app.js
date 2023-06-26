const Koa = require('koa')
const KoaStatic = require('koa-static')
const koabady = require('koa-body')
const session = require('koa-session-minimal');
const cros = require('cors')
const jwtToken = require('jsonwebtoken')
const Router = require('./routers/index')
const app = new Koa()

// 配置会话中间件
app.use(session({
    key: 'session-code', // cookie 中存储会话 ID 的键名
    cookie: {
      maxAge: 1000 * 60 * 10, // 会话过期时间（毫秒）
      secure: false, // 设置为true则只能通过安全的 HTTPS 连接进行传输
      httpOnly: true,
    },
}));

// // 处理跨域
// app.use(cros( {
//   origin: '*', // 将其设置为真实的 origin URL 更安全
//   methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }))

// 处理请求体的数据
const bodyMiddle = require('./middleWear/bodyMiddle')
app.use(koabady.koaBody(bodyMiddle))
// 使用路由
app.use(Router.routes()).use(Router.allowedMethods())

// 统一异常处理
const errMiddle = require('./middleWear/errMiddle')
app.use(errMiddle)

// 判断token是否过期
app.use(async(ctx,next)=>{
  const {token} = ctx.request.header
  console.log(token);
    await jwtToken.verify(token,'huxiaodong',async (err,data)=>{
      if(err){
          return ctx.body = {
              data:null,
              msg:'token已过期',
              status:20001
          }
        }else{
          next()
        }
    })
})

const {Port} = require("./config.js")
app.listen(Port,()=>{
    console.log(`服务启动在${Port}端口`);
})


