import * as fs from "fs";
import express from "express";
import { createServer as createServerHTTP } from "http";
import { createServer as createServerHTTPS } from "https";
import { Server } from "socket.io";

// Types
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import EventEmitter from "events";

const app = express();

export const createServerSocket = (domain, port, options: {}) => {
  const isDev = domain == "localhost" ? true : false;
  console.log(`Running on ${isDev ? "dev" : "production"} mode`);

  const _cors = isDev
    ? { cors: { origin: "*", methods: ["GET", "POST"] } }
    : { cors: { origin: `https://${domain}`, methods: ["GET", "POST"] } };

  const httpsServer = isDev
    ? //@ts-ignore
      createServerHTTP(options, app)
    : createServerHTTPS(options, app);

  const socketIO = new Server(httpsServer, _cors);

  httpsServer.listen(port, () => {
    console.log("Listening to requests on port: ", port);
  });

  app.get("/", function (req, res) {
    res.sendStatus(408);
  });
  return socketIO;
};
