const jwtToken = require('jsonwebtoken')
const svgCaptcha = require('svg-captcha');

const userSql = require('../connectionSql/user')

module.exports = {
    // 登录
    Login:async ctx => {
        const {username,password,code} = ctx.request.body
        const loginCode = ctx.session.loginCode
        if(!loginCode || loginCode.toLowerCase() !== code.toLowerCase() ){
            return ctx.body = {
                status:20001,
                msg:'验证码错误',
                data:null
            }
        }
        
        try {
            let user = await userSql.Login(username,password)
            if(user.length === 0){  // 未找到该用户
                return ctx.body = {
                    status:20001,
                    msg:'用户名或者密码错误',
                    data:null
                }
            }
            if(user.length === 1) {
                let token = jwtToken.sign({
                    username:user[0].name,
                    password:user[0].password
                },'huxiaodong',{
                    expiresIn:'1h' // 设置token有效期
                })
                
                const update = await userSql.Login(username,undefined,token)
                if(update.affectedRows === 1){
                    return ctx.body = {
                        status:20000,
                        data:token,
                        msg:'成功'
                    }
                }else{
                    return ctx.body = {
                        status:20001,
                        data:null,
                        msg:'token更新失败，请重试'
                    }
                }
                
            }
            if(user.length !== 1) {
                return ctx.body = {
                    status:20004,
                    msg:'未知错误',
                    data:null
                }
            }
        } catch (error) {
            console.log('Login',error);
            return ctx.body = {
                status:20004,
                msg:'未知错误,token获取失败',
                data:null
            }
        }
    },
    // 获取验证码
    GetLoginCode: ctx => {
        const code = svgCaptcha.create({
            size: 4, // 验证码长度
            noise: 4, // 干扰线数量
            background: '#ff0', // 背景颜色
            color: true, // 字体颜色是否随机
            ignoreChars: '0o1i', // 忽略的字符，不包含 0、1、o 和 i，避免与数字混淆
            fontSize: 100, // 字体大小
            height: 100, // 图片高度
            width: 200, // 图片宽度
        });
        ctx.type = 'svg'
        ctx.session.loginCode = code.text
        return ctx.body = {
            status:'20000',
            msg:'获取验证码成功',
            data:code.data
        }
    },
    // 获取用户信息
    GetuserInfo : async ctx =>{
        const {token} = ctx.request.header
        let userInfo = await userSql.Login(undefined,undefined,token)
        return ctx.body = {
            data:{
                name:userInfo[0].name,
                phone:userInfo[0].phone,
                email:userInfo[0].email,
                address:userInfo[0].address,
                avatar:userInfo[0].avatar,
                role:userInfo[0].role.split(','),
                userId:userInfo[0].id,
                deptId:userInfo[0].dept_id
            },
            msg:'成功',
            status:20000
        }
    },

    // 退出登录
    LoginOut:async ctx => {
        const {token} = ctx.request.header
        try {
            await userSql.LoginOut(token)
            return ctx.body = {
                data:null,
                msg:'退出成功',
                status:20000
            }
        } catch (error) {
            return ctx.body = {
                data:null,
                msg:'退出失败',
                status:20001
            }
        }
    },

    // 修改用户信息
    ModifyUserInfo:async ctx => {
        const {id,userInfo} = JSON.parse(ctx.request.body)
        try {
            await userSql.ModifyUserInfo(id,userInfo)
            return ctx.body = {
                data:null,
                msg:'用户信息修改成功',
                status:20000
            }
        } catch (error) {
            console.log('ModifyUserInfo',error);
            return ctx.body = {
                data:null,
                msg:'用户信息修改失败',
                status:20001
            }
        }
        
    }
}