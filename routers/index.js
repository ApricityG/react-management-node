const Router = require('koa-router')

const userRouter = require('./routes/userRouter')

const collegeRouter = require('./routes/collegeRouter')
const routers = new Router()

routers.use(userRouter.routes())
routers.use(collegeRouter.routes())

module.exports = routers