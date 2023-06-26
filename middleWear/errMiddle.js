module.exports = async (ctx,next)=>{
    try {
      await  next()
    } catch (error) {
        // 后续建立一个文件专门存放系统错误
        console.log(error)
        ctx.body = {
            code:500,
            msg:'服务器错误'
        }
    }
}