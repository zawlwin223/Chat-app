const express=require ("express")
const app    =express()
const http   =require("http")
const path   =require("path")
const hogan  =require("hogan-xpress")
let   server =http.createServer(app)
let   io     =require("socket.io")(server)
let nsp_game =io.of("/game")
let nsp_book=io.of("/book")

nsp_game.on("connection",(socket)=>{
  socket.on("game_name",(name)=>{
    console.log(name)
  })
})

nsp_book.on("connection",(socket)=>{
  socket.on("book_name",(name)=>{
    console.log(name)
  })
})

require ("dotenv").config()

app.engine("html",hogan)
app.set("view engine","html")
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
   res.render("index")
})
let map=new Map()
let room1="public"
let room2="private"

io.on("connection", (socket) => {
    //login section
    socket.on("user_name",(user_name_data)=>{
        socket.name=user_name_data
        map.set(socket.name,socket.id)
      if(user_name_data=="w"||user_name_data=="y"){
        socket.join(room1)
        socket.room=room1
      }else{
        socket.join(room2)
        socket.room=room2
      }
      socket.emit("send_user_name",socket.name);
     
    })
    //messae section
    socket.on("send_msg_to_server",(msg)=>{
        socket.msg=msg
        // io.to(room1).emit("send_msg_to_user",socket.msg)
        socket.to(socket.room).emit("send_msg_to_user",`${socket.name}:${socket.msg}`)
    })
  });


server.listen(process.env.PORT,()=>{
    console.log("Server is Working")
})