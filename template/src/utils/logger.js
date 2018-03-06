import winston from 'winston';

const loggerTransport = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  loggerTransport.push(new winston.transports.Console({ level: 'debug' }));
} else if (process.env.NODE_ENV === 'production') {
  loggerTransport.push(
    new winston.transports.Console({ level: 'error' }),
    new winston.transports.File({ filename: './log/PROJECT_NAME.log' })
  );
}

module.exports = new winston.Logger({ transports: loggerTransport });
