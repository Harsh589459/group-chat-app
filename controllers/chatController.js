const path = require('path');
const User = require("../models/userModels");
const Chat = require("../models/chatModels");
const Op = require('sequelize')




const getChatPage = async (req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,"../","public","views","chat.html"))
    }
    catch(error){
        console.log(error);
    }
}
const sendMessage = async (req, res, next) => {
    try {
      await Chat.create({
        name: req.user.name,
        message: req.body.message,
        userId: req.user.id,
      });
      return res.status(200).json({ message: "Message Sent Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error" });
    }
  };

  const getMessage = async (req,res,next)=>{
    try{
      const param = req.params.param;
      const messags =  await Chat.findAll({where: {
        id: {
          [Op.gt]: param,
        },
      },})

       return res.status(200).json({messages:messags})
    }
    catch(error){
        console.log(error);

    }
  }

module.exports={
    getChatPage,
    sendMessage,
    getMessage
}