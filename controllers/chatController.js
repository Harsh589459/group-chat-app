const path = require('path');
const User = require("../models/userModels");
const Chat = require("../models/chatModels");
const Group = require('../models/groupModel')




const getChatPage = async (req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,"../","public","views","chat.html"))
    }
    catch(error){
        console.log(error);
    }
}

const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("getMessages", async (groupName) => {
    try {
      const group = await Group.findOne({ where: { name: groupName } });
      const messages = await Chat.findAll({
        where: { groupId: group.dataValues.id },
      });
      console.log("Request Made");
      io.emit("messages", messages);
    } catch (error) {
      console.log(error);
    }
  });
});





const sendMessage = async (req, res, next) => {
    try {
      const group = await Group.findOne({
        where:{
          name:req.body.groupName
        },
      
      })
      await Chat.create({
        name: req.user.name,
        message: req.body.message,
        userId: req.user.id,
        groupId:group.dataValues.id,
      });
      return res.status(200).json({ message: "Message Sent Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error" });
    }
  };

//   const getMessage = async (req, res, next) => {
//   try {
//     const param = Number(req.query.param);
//     console.log("param value:", param); // Add this line

//     const group = await Group.findOne({
//       where: { name: req.query.groupName },
//     });
//     const messages = await Chat.findAll({
//       where: {
//         [Op.and]: {
//           id: {
//             [Op.gt]: param,
//           },
//           groupId: group.dataValues.id,
//         },
//       },
//     });
//     return res.status(200).json({ messages: messages });
//   } catch (error) {
//     console.log(error);
//   }
// };
  




module.exports={
    getChatPage,
    sendMessage,
    // getMessage
}