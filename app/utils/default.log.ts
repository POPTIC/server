// src/helper/default.logger.ts
import { configure, getLogger } from 'log4js';
import { environment } from '../config/enviroment';
// appenders
configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      type: 'dateFile',
      filename: `${environment.logDir}/${environment.logFile}`,
      layout: { type: 'basic' },
      compress: true,
      numBackups: 1024,
      keepFileExt: true
    }
  },
  categories: {
    default: { appenders: ['console', 'dateFile'], level: environment.logLevel }
  }
});
// fetch logger and export
export const logger = getLogger();