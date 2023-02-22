const express = require("express");
var http = require("http");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
const socket = require("socket.io");
//middleware
app.use(express.json());
app.use(express.static("public"));

server.listen(port,"0.0.0.0", function (){
    console.log("server started");
    console.log(`Listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});

//Checking For Connection
app.route("/check").get((res,req)=>{
  return res.json("Your App Is Running Successfully!!");
})
// Socket setup
const io = socket(server);

var clients = {}
io.on("connection", function (socket) {
  console.log("Made socket connection");
  console.log(socket.id ,"socket id has joined");
  //Listening to FrontEnd 
// signing in user
  socket.on("signin",(id)=>{
         console.log(id);
         clients[id] = socket;
  });

  //sending message
  socket.on("message",(msg)=>{
    let targetId = msg.targetId;
    if(clients[targetId]) clients[targetId].emit("message",msg);
    console.log(msg);
});
});
