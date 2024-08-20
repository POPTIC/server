// src/configuration/environment.ts
export const environment = {
  nodeEnv: process.env.ENV || process.env.NODE_ENV,
  logDir: process.env.LOG_DIR || "logs",
  logLevel: process.env.LOG_LEVEL || "info",
  logFile: process.env.LOG_FILE || "app.log",
  key: 'poptic',
  TokenExpiredTime: 60 * 60,
  fileLocation: '/home/poptic/code/koa/server',
};

export const serverConfig = {
    port: process.env.PORT || 8888,
}