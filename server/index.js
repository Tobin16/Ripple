const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes')
const messageR = require('./routes/messagesRoutes')
const app = express();
require('dotenv').config();


app.use(cors());
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