const path = require('path');
// 配置文件，用于设定相关配置
module.exports = {
  KEYS: 'poptic',
  PORT: 3000,
  STATIC_ARTICLE_DIR: path.join(__dirname, '../public/article'),
  STATIC_VIDEO_DIR: path.join(__dirname, '../public/video'),
  STATIC_PICTURE_DIR: path.join(__dirname, '../public/picture'),
  UPLOAD_DIR: path.join(__dirname, path.resolve('public/')),
  TOKEN_EXPIRES_TIEM: 60 * 60,
  TEMP_DIR: path.resolve(__dirname, "temp"),
  UPLOAD_DIR: path.resolve(__dirname, "video"),
  VIDEO_DIR: path.resolve(__dirname, 'video'),
  CHUNK_SIZE: 1 * 1024 * 1024,
}