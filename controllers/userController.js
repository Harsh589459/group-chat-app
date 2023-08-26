const path = require('path');
const User = require('../models/userModels');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");



const getSignupPage = async (req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,"../","public","views","signUp.html"))
    }
    catch(error){
        console.log(error);
    }
}
const getLoginPage = async (req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,"../","public","views","login.html"))
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
function generateAccessToken(id,email){
    return jwt.sign({userId:id,email:email},process.env.TOKEN)
}
const postLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;

       return  await User.findOne({ where: { email: email } }).then((response) => {
            if (response) {
                console.log(response);
                bcrypt.compare(password, response.password, (err, passwordMatch) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: "Something Went wrong" })
                    }
                    if (passwordMatch == true) {
                        return res.status(200).json({
                            success: true,
                            message: "Logged In Successfully",token:generateAccessToken(response.id,response.email)
                        })
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: "User not authorized",
                        })
                    }

                })
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}




module.exports={
    getSignupPage,
    postSignUp,
    getLoginPage,
    postLogin
}