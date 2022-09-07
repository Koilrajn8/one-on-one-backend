import express from 'express';
const app = express();
import {createServer}  from 'http';
import {Server} from "socket.io";
const server = createServer(app);
import cors from 'cors';

const PORT = 3001;


app.use(cors()); 

// const io = new Server(3002);

const io = new Server(server, {
  cors: {
    origin: 'https://localhost:3002',
  }
});



io.on('connection', (socket) => {

  console.log(`a user connected: ${socket.id}`);

  socket.on("join_room", ({user, room}) => {
    socket.join(room)
  })

  socket.on("send_msg", ({room,user,message}) => {
    const d = {user: user, message: message}
    console.log(d)
    socket.to(room).emit("receive_msg",d);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});