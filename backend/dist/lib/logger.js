"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
// Define log colors
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'white',
};
// Determine environment
const logLevel = config_1.config.https.isProduction ? 'warn' : 'debug';
// Apply colors
winston_1.default.addColors(colors);
// Development format (colorized logs)
const devFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.colorize(), winston_1.default.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`));
// Production format (JSON logs)
const prodFormat = winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json());
// Configure daily rotating logs
const dailyRotateTransport = new winston_daily_rotate_file_1.default({
    dirname: 'logs',
    filename: 'app-%DATE%.log', // Example: logs/app-2025-03-11.log
    datePattern: 'YYYY-MM-DD',
    maxSize: '5m', // Each log file max 5MB
    maxFiles: '14d', // Keep logs for 14 days
    zippedArchive: true, // Compress old logs
});
// Create the logger
const logger = winston_1.default.createLogger({
    level: logLevel,
    levels,
    format: config_1.config.https.isProduction ? prodFormat : devFormat,
    transports: [new winston_1.default.transports.Console(), dailyRotateTransport],
    exceptionHandlers: [
        new winston_daily_rotate_file_1.default({
            dirname: 'logs',
            filename: 'exceptions-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '5m',
            maxFiles: '14d',
            zippedArchive: true,
        }),
    ],
    rejectionHandlers: [
        new winston_daily_rotate_file_1.default({
            dirname: 'logs',
            filename: 'rejections-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '5m',
            maxFiles: '14d',
            zippedArchive: true,
        }),
    ],
});
exports.default = logger;
