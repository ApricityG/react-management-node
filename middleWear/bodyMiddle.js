const {staticDir} = require('../config')

module.exports = {
    multipart:true,
    formidable:{
        uploadDir:staticDir,  // 设置文件上传目录
        keepExtensions:true, // 保持文件的后缀,
        type: ['application/json', 'text/plain'], // 支持处理 JSON 和纯文本请求体
        maxFieldsSize:2*1024*1024, // 文件上传的大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            console.log(`name: ${name}`);
            console.log(file);
          }
    }
}