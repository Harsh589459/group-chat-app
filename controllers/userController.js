const path = require('path');
const User = require('../models/userModels');
const bcrypt = require('bcrypt')


const getSignupPage = async (req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,"../","public","views","signUp.html"))
    }
    catch(error){
        console.log(error);
    }
}

const postSignUp = async(req,res,next)=>{
    try{
        const {name,email,number,password} = req.body;
        console.log(req.body)
        const response = await User.findOne({where:{email:email}})
        if(response){
           return  res.status(409).send(`<p>User already Exist move on the login page</p>`)
        }

        else{
            bcrypt.hash(password,10,async(err,hash)=>{
                await User.create({
                    name:name,
                    email:email,
                    password:hash,
                    number:number
                })
            })
            return res.status(200).send(`<p>Signup Successfully</p>`)
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err,message:"Something went Wrong"});
    }

}

module.exports={
    getSignupPage,
    postSignUp
}