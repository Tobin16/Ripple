const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes')
const messageR = require('./routes/messagesRoutes')
const app = express();
const socket = require('socket.io')
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true,  
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', userRoute);
app.use('/api/messages', messageR);

mongoose.connect(process.env.MONGO_URL,{
    UseNewUrlParser : true,
    useUnifiedTopology : true
}).then( ()=>{
    console.log("connected to mongodb server")
}).catch(err=>{
    console.log(err.message)
});


const server = app.listen(process.env.PORT, () =>{
    console.log(`server started on port ${process.env.PORT}`);
})

const io = socket(server,{
    cors : {
        origin : "http://localhost:5173",
        credentials : true,
    },
});

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg", (data)=>{
        console.log({data})
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    });

})