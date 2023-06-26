const Router = require('koa-router');
const router = new Router()

const user = require('../../controllers/userCont')
// 登陆/注册
router.post('/login',user.Login)


// 获取验证码
router.get('/login/code',user.GetLoginCode)

// 获取用户信息
router.get('/userInfo',user.GetuserInfo)

// 退出登录
router.get('/loginOut',user.LoginOut)

// 修改用户信息
router.post('/modifyUserInfo',user.ModifyUserInfo)

module.exports = router