const path = require('path');




const getChatPage = async (req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,"../","public","views","chat.html"))
    }
    catch(error){
        console.log(error);
    }
}

module.exports={
    getChatPage
}