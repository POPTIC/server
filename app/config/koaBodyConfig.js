const {uploadDir} = require("./serverConfig.js")
// 没有对其解包导致出现问题

const koaBodyConfig = {
  multipart: true,
  // parsedMethods默认是['POST', 'PUT', 'PATCH']
  // parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // 拦截的解析方法
  formidable: {
    parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
    uploadDir: uploadDir, // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小限制
    onFileBegin: (name, file) => { // 文件上传前的设置钩子
      // console.log(`name: ${name}`);
      console.log(name);
    }
  }
}

module.exports = koaBodyConfig;