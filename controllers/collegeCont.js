const collegeSql = require('../connectionSql/college')

module.exports = {
  // 获取所有校区
  GetCampus :async cxt =>{
    try {
      const result = await collegeSql.GetCampus()
      if(result) {
        cxt.body = {
          status:20000,
          data:result,
          mag:'获取数据成功'
        }
      }else{
        cxt.body = {
          status:20004,
          data:result,
          mag:'数据异常'
        }
      }
    } catch (error) {
      console.log('GetCampus',error);
      cxt.body = {
        status:20001,
        data:null,
        mag:'获取数据失败'
      }
    }
  },

  // 获取所有学院
  GetColleges : async ctx =>{
    const {offset,count} = ctx.request.params
    try {
      const result = await collegeSql.GetColleges(((offset-1)*count).toString(),count.toString())
      if(result){
        ctx.body = {
          status:20000,
          data:{data:result.data,total:result.total[0].total,offset:parseInt(offset)},
          msg:'获取数据成功'
        }
      }else{
        ctx.body = {
          status:20004,
          data:null,
          msg:'数据异常'
        }
      }
    } catch (error) {
      console.log('GetColleges',error);
      ctx.body = {
        status:20001,
        data:null,
        mag:'获取数据失败'
      }
    }
  },

  // 根据校区获取学院
  GetCollegeById : async ctx=>{
    const {offset,count,id} = ctx.request.params
    try {
      const result = await collegeSql.GetCollegeById(((offset-1)*count).toString(),count.toString(),id)
      if(result){
        ctx.body = {
          status:20000,
          data:result,
          msg:'获取数据成功'
        }
      }else{
        ctx.body = {
          status:20001,
          data:null,
          msg:' '
        }
      }
    } catch (error) {
      console.log('GetCollegeById',error);
      ctx.body = {
        status:20001,
        data:null,
        msg:'获取数据失败'
      }
    }
  }
}