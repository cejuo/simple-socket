"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerSocket = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const https_1 = require("https");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const createServerSocket = (domain, port, options) => {
    const isDev = domain == "localhost" ? true : false;
    console.log(`Running on ${isDev ? "dev" : "production"} mode`);
    const _cors = isDev
        ? { cors: { origin: "*", methods: ["GET", "POST"] } }
        : { cors: { origin: `https://${domain}`, methods: ["GET", "POST"] } };
    const httpsServer = isDev
        ? //@ts-ignore
            (0, http_1.createServer)(options, app)
        : (0, https_1.createServer)(options, app);
    const socketIO = new socket_io_1.Server(httpsServer, _cors);
    httpsServer.listen(port, () => {
        console.log("Listening to requests on port: ", port);
    });
    app.get("/", function (req, res) {
        res.sendStatus(408);
    });
    return socketIO;
};
exports.createServerSocket = createServerSocket;
