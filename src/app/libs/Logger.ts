import winston from 'winston';
import colors from 'colors/safe';

const logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info: winston.Logform.TransformableInfo): string => {
      let message: string;

      if (info.level === 'error') {
        message = `${colors.red(`[${info.timestamp}] ${info.level}:`)} ${
          info.message
        }`;
      } else if (info.level === 'warn') {
        message = `${colors.yellow(`[${info.timestamp}] ${info.level}:`)} ${
          info.message
        }`;
      } else if (info.level === 'info') {
        message = `${colors.green(`[${info.timestamp}] ${info.level}:`)} ${
          info.message
        }`;
      } else {
        message = `${colors.blue(`[${info.timestamp}] ${info.level}:`)} ${
          info.message
        }`;
      }
      return message;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/TypegramBot/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/TypegramBot/warn.log',
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'logs/TypegramBot/info.log',
      level: 'info',
    }),
    new winston.transports.File({ filename: 'logs/TypegramBot.log' }),
  ],
});

export default logger;
