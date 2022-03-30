"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//configuring origin.
const corsOrigin = (0, cors_1.default)();
//creating server
const server = (0, express_1.default)();
//middleware
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
server.use((0, morgan_1.default)("dev"));
server.use(corsOrigin);
//routes
exports.default = server;
//# sourceMappingURL=server.js.map