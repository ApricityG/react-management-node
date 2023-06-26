const db = require('./db')

module.exports = {
  GetCampus : async ()=>{
    const sql = 'select * from campuses'
    return await db(sql)
  },

  GetColleges : async (offset,count)=>{
    const sqlData = `select colleges.id as id,colleges.name as collegeName,campuses.name as campusName,campuses.address as address,group_concat(distinct majors.name) as majorName
                 from colleges
                 join campuses on colleges.campus_id = campuses.id
                 join majors on majors.college_id = colleges.id
                 group by id,collegeName,campusName,address
                 limit ?, ?;`
    const sqlTotal = `select count(*) as total
                      from 
                      (select colleges.id as id,colleges.name as collegeName,campuses.name as campusName,campuses.address as address,group_concat(distinct majors.name) as majorName
                      from colleges
                      join campuses on colleges.campus_id = campuses.id
                      join majors on majors.college_id = colleges.id
                      group by id,collegeName,campusName,address)
                      as t`
    const data = await db(sqlData,[offset,count])
    const total = await db(sqlTotal)
    return {
      data,
      total
    }
  },

  GetCollegeById : async (offset,count,id)=>{
    const sqlData = `select colleges.id as id,colleges.name as collegeName,campuses.name as campusName,campuses.address as address,group_concat(distinct majors.name) as majorName
                      from colleges
                      join campuses on colleges.campus_id = campuses.id
                      join majors on majors.college_id = colleges.id
                      where colleges.id = ?
                      group by id,collegeName,campusName,address
                      limit ?, ?;`
    const sqlTotal = `select count(*) as total
                      from 
                      (select colleges.id as id,colleges.name as collegeName,campuses.name as campusName,campuses.address as address,group_concat(distinct majors.name) as majorName
                      from colleges
                      join campuses on colleges.campus_id = campuses.id
                      join majors on majors.college_id = colleges.id
                      where colleges.id = ?
                      group by id,collegeName,campusName,address)
                      as t`
      const data = await db(sqlData,[offset,count,id])
      const total = await db(sqlTotal,[id])
      return {
      data,
      total
      }
    },
}