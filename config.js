const  path = require('path')

module.exports =  {
    Port : 3000, // 启动端口
    staticDir: path.resolve('./public'), // 静态资源路径
    uploadFile: path.join(__dirname,path.resolve('./public')), // 文件的上传路径
    dbConfig:{  // 数据库链接配置
        connectionLimit: 10, // 配置数据库最大连接数
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'management'
    }
}