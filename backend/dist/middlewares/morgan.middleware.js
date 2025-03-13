"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../lib/logger"));
const config_1 = require("..//config");
// Define Morgan stream to use custom logger
const stream = {
    write: (message) => logger_1.default.http(message.trim()),
};
// Skip logs in production except for warnings & errors
const skip = () => config_1.config.https.isProduction && logger_1.default.level !== 'http';
// Build the Morgan middleware
const morganMiddleware = (0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', { stream, skip });
exports.default = morganMiddleware;
