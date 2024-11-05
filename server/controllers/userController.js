
const User = require('../models/userModel')
const bcrypt = require("bcrypt")
module.exports.register = async (req,res,next) =>{
  try {
    const {username,email,password} = req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
     return res.json({msg:"username already used", status : false})
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck) return res.json({msg: "email already in use",status : false})
 
     const hashedPassword = await bcrypt.hash(password,10);
 
     const user = await User.create({
         email,
         username,
         password : hashedPassword
     })
 
     delete user.password;
     return res.json({status:true, user})
  } catch (error) {
    next(error)
  }
}

module.exports.login = async (req,res,next) =>{
  try {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
     return res.json({msg:"incorrect username or password", status : false})
    }
    const isPasswordCheck = await bcrypt.compare(password,user.password)
    if(!isPasswordCheck) return res.json({msg: "incorrect username or password",status : false})

     delete user.password;
     return res.json({status:true, user})
  } catch (error) {
    next(error)
  }
}
module.exports.setAvatar = async (req,res,next) =>{
  try {
     const userId = req.params.id;
     const AvatarImage = req.body.image

     const userData = await User.findByIdAndUpdate(userId,{
      isAvatarImageSet:true,
      AvatarImage
     })
     return res.json({isSet: userData.isAvatarImageSet, image : userData.AvatarImage})
  } catch (error) {
    next(error)
  }
}
module.exports.getAllUsers = async (req,res,next) =>{
  try {
    const users = await User.find({ _id: { $ne: req.params.id }}).select([
      "email",
      "username",
      "AvatarImage",
      "_id"
    ]);
    return res.json(users);
  } catch (error) {
    next(error)
  }
}

