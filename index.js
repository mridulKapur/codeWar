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
    if (!rooms.includes(data.roomHash)) {
      rooms.push(data.roomHash)
      let room = {};
      room.name = data.roomHash;
      room.members = [];
      socket.join(room.name);
      room.members.push(socket.id);
      socket.emit("allow", {
        data: room,
      });
      rooms.push(room);
      console.log(room);
    } else {
      console.log("here");
      for (let obj of rooms) {
        if (obj.name == data.roomHash) {
          console.log(1, obj);
          obj.members.push(socket.id);
          socket.join(obj.name);
          socket.emit("allow", {
            data: obj,
          });
        }
      }
    }
  });
  socket.on('joinSolo', (data) => {
    let room = {}
    room.name = data.roomHash;
    socket.join(room.name)
    socket.emit('allowSolo', room)
  })
  socket.on("run", (data) => {
    let program = {
      code: data.code,
      language: data.language,
      input: data.input,
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
        io.sockets.in(data.roomName).emit("ans", {
          output: body.output,
          code: data.code,
          editor1: data.editor1,
          editor2: data.editor2,
        });
      }
    );
  });
  socket.on("runSolo", (data) => {
    let program = {
      code: data.code,
      language: data.language,
      input: data.input,
    };
    request(
      {
        url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        console.log(data)
        console.log("error:", error);
        console.log("statusCode:", response && response.statusCode);
        console.log("body:", body);
        io.sockets.in(data.roomName).emit("ansSolo", {
          output: body.output,
          code: data.code
        });
      }
    );
  });
  socket.on("sendCode", (data) => {
    console.log(data);
    socket.broadcast.to(data.roomName).emit("receiveCode", data);
  });
  socket.on('langUpdate', (data) => {
    socket.broadcast.to(data.roomName).emit('langUpdated', data);
  })
});

server.listen(port, () => {
  console.log("server started at http://localhost:4333");
});
