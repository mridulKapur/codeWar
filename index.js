const express = require("express");
//const request = require("request");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require('path')
const socket = require("socket.io");
const io = socket(server);

const port = process.env.PORT || 4333

// Deployment Code

// app.use(express.static(path.join(__dirname, 'client/build')))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })

io.on("connection", (socket) => {
  console.log(socket.id);
});

server.listen(port, () => {
  console.log("server started at http://localhost:4333");
});
