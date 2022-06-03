# Usage

```js
import { Server, Socket } from "socket.io";

const PORT = 8080;
const DOMAIN = "localhost";
const options = {
    key: fs.readFileSync(process.env.certificateKey),
    cert: fs.readFileSync(process.env.certificateCert),
    ca: fs.readFileSync(process.env.certificateCa),
    passphrase: process.env.certificatePassphrase,
};

const server: Server = createServerSocket(DOMAIN, PORT, options);

const onConnection = (socket: Socket) => {
  Log.info(`New connection ${socket.id}`);

  socket.on(/*...*/, (data)=>{
    /*...*/
  });
};

server.on("connection", onConnection);
```
