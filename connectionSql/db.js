const sql = require('mysql2/promise')
const {dbConfig} = require('../config')
const db = sql.createPool(dbConfig)
module.exports = async (sql,params=[])=>{
    const result = await db.execute(sql,params)
    return result[0]
}
