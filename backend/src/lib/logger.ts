import { config } from '../config'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// Define log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
  debug: 'white',
}

// Determine environment
const logLevel = config.https.isProduction ? 'warn' : 'debug'

// Apply colors
winston.addColors(colors)

// Development format (colorized logs)
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
  )
)

// Production format (JSON logs)
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
)

// Configure daily rotating logs
const dailyRotateTransport = new DailyRotateFile({
  dirname: 'logs',
  filename: 'app-%DATE%.log', // Example: logs/app-2025-03-11.log
  datePattern: 'YYYY-MM-DD',
  maxSize: '5m', // Each log file max 5MB
  maxFiles: '14d', // Keep logs for 14 days
  zippedArchive: true, // Compress old logs
})

// Create the logger
const logger = winston.createLogger({
  level: logLevel,
  levels,
  format: config.https.isProduction ? prodFormat : devFormat,
  transports: [new winston.transports.Console(), dailyRotateTransport],
  exceptionHandlers: [
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
      maxFiles: '14d',
      zippedArchive: true,
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'rejections-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
      maxFiles: '14d',
      zippedArchive: true,
    }),
  ],
})

export default logger
