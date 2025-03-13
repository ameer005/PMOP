"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const app_1 = require("./app");
const logger_1 = __importDefault(require("./lib/logger"));
const connect_1 = require("./db/connect");
dotenv_1.default.config();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect_1.prisma.$connect();
        console.log('Connected to postgres');
    }
    catch (error) {
        logger_1.default.error(error);
    }
    if (config_1.config.https.isProduction) {
        app_1.app.listen(config_1.config.https.listenPort, () => { });
    }
    else {
        app_1.app.listen(config_1.config.https.listenPort, '0.0.0.0', () => { });
    }
    console.log(`Server is running on port ${config_1.config.https.listenPort}`);
});
start();
