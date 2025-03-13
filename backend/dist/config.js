"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    domain: process.env.DOMAIN || 'localhost',
    https: {
        listenIp: '0.0.0.0',
        listenPort: Number(process.env.PORT) || 5000,
        isProduction: process.env.NODE_ENV === 'production',
    },
};
