const db = require('./db')

// 用户相关


module.exports = {
    // 登陆
    Login:async (name=undefined,password=undefined,token=undefined)=>{
       if(token === undefined){
        const sql = `select * from  user where name = ? and password = ?`
        let result = await db(sql,[name,password])
        return result;
       }else if(name!==undefined && token!==undefined){
        const sql = `update user set token = ? where name = ? `
        let result = await db(sql,[token,name])
        return result;
       }else{
        const sql = "select * from  user where token = ? "
        let result = await db(sql,[token])
        return result;
       }
    },
    // 注册
    Register:async (userName,password,userPhoneNumber)=>{
        const sql = 'insert into userInfo values(null,?,?,?)'
        return await db(sql,userName,password,userPhoneNumber)
    },

    // 退出登录
    LoginOut:async (token)=>{
        const sql = "update user set token = ''  where token = ?"
        let result = await db(sql,[token])
        return result
    },

    // 修改信息 
    ModifyUserInfo:async(id,upUserInfo) => {
        let sql = 'UPDATE user SET'
        for (const key in upUserInfo) {
            sql += ' ' + key + ' = ' +upUserInfo[key] + ','
        }
        sql = sql.slice(0,-1)
        sql += ' WHERE id= ?'
        return await db(sql,[id])
    }
}

