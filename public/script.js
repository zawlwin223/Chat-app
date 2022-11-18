const login_box=document.querySelector(".login-box")
const chat_box=document.querySelector(".chat-box")
const login_button=document.querySelector("#login")
const send_button=document.querySelector("#send")
const user=document.querySelector("#user")
const msg=document.querySelector("#message")
const msg_box=document.querySelector(".msg_box")
const socket=io("http://localhost:3000")
const game_socket=io("/game")
const book_socket=io("/book")
const start_game=document.querySelector("#start_game")
const start_book=document.querySelector("#start_book")
let user_from_other=
//login section
login_button.addEventListener("click",()=>{
    socket.emit("user_name",user.value)
    user.value=""
})

socket.on("send_user_name",(name)=>{
    if(name){
        login_box.classList.add("hide")
        chat_box.classList.remove("hide")
    }
   
    console.log(name)
})


//login section end 

//send message 

send_button.addEventListener("click",()=>{
    let div=`<div>You:${msg.value}</div>`
    socket.emit("send_msg_to_server",msg.value)
    msg_box.innerHTML+=div
    msg.value=""
})

socket.on("send_msg_to_user",msg=>{
    let div=`<div> ${msg}</div>`
    msg_box.innerHTML+=div
})

function append_user(name){
    let div=`<div>${name} has joined</div>`
    msg_box.innerHTML+=div
}
//send message section end

//another socket name space
start_game.addEventListener("click",()=>{
    game_socket.emit("game_name","Mobile Legend")
    console.log("Game is started")
})
start_book.addEventListener("click",()=>{
    book_socket.emit("book_name","Readers Digest")
    console.log("Book is started")
})