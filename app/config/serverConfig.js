const path = require('path');
// 配置文件，用于设定相关配置
module.exports = {
  Keys : 'poptic',
  Port : 3000,
  staticArticleDir : path.join(__dirname, '../public/article'),
  staticVideoDir : path.join(__dirname, '../public/video'),
  staticPictureDir : path.join(__dirname, '../public/picture'),
  uploadDir : path.join(__dirname, path.resolve('public/')),
  tokenExpiresTime : 60 * 60,
}