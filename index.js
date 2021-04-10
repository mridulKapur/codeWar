const express = require("express");
const request = require("request");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const socket = require("socket.io");
const io = socket(server);

const port = process.env.PORT || 4333;

// Deployment Code

// app.use(express.static(path.join(__dirname, 'client/build')))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })

let rooms = [];
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("joinRoom", (data) => {
      console.log("joining room...");
    for (let room of rooms) {
        if (room.name == data.roomHash && room.members.length == 1) {
          socket.join(room.name);
          room.members.push(socket.id);
          socket.emit("allow2", {});
          console.log("room joined", room);
          break;
        }
      }
  });
  socket.on("createRoom", (data) => {
      let room = {};
      room.name = data.roomHash;
      room.members = [];
      socket.join(room.name);
      room.members.push(socket.id);
      socket.emit("allow1", {
        data: room,
      });
      rooms.push(room);
      console.log("created room",room);
  });
  socket.on("run", (data) => {
    let program = {
      code: data.code,
      language: data.language,
      input: data.input
    };
    request(
      {
        url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        console.log("error:", error);
        console.log("statusCode:", response && response.statusCode);
        console.log("body:", body);
        socket.emit('ans', {
          output: body.output,
          code: data.code
        })
      }
    );
  });
  socket.on("sendCode", (data) => {
    console.log(data);
    socket.broadcast.emit("reciveCode",data);
  })
});

server.listen(port, () => {
  console.log("server started at http://localhost:4333");
});
