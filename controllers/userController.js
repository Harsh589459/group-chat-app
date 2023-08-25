const path = require('path');



const getSignupPage = async (req,res,next)=>{
    try{
        console.log("first")
        res.sendFile(path.join(__dirname),"../","public","views","signUp.html")
    }
    catch(error){
        console.log(error);
    }
}

module.exports={
    getSignupPage
}