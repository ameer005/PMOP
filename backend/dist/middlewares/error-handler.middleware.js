"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Maintain correct prototype chain
    }
}
exports.CustomError = CustomError;
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong! Try again later.';
    // Handle custom errors
    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // Handle JWT errors
    if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
        statusCode = 401;
        message = 'Invalid token! Please try again later.';
    }
    if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
        statusCode = 401;
        message = 'Your token has expired, Please log in again.';
    }
    // Log detailed error in development mode
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    }
    res.status(statusCode).json({
        status: 'fail',
        message,
    });
};
exports.default = errorHandler;
