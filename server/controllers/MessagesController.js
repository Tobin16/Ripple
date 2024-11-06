const User = require('../models/userModel')
const Messages = require('../models/messageModel');

module.exports.addMessage = async (req,res,next) =>{

  try {
    const {from , to , message} = req.body

    const data = await Messages.create({
        message : {text : message},
        users : [from, to],
        sender : from
    })
    console.log(data);
    if(data) return res.json({msg:"Message added succesfully"})
    return res.json({msg : 'failed to add msg to the database'})
  } catch (error) {
    next(error)
  }
};

module.exports.getAllMessages = async (req,res,next) =>{
  try {
    const {from , to} = req.body;
    const messages = await Messages.find({
        users : {
            $all : [from,to]
        }
    })
    .sort({updatedAt:1})

  const projectedMessages = messages.map((msg)=>{
    return {
        fromSelf : msg.sender.toString() === from,
        message : msg.message.text
    }
  })

   return res.json(projectedMessages)
   
  } catch (error) {
    next(error)
  }
};
