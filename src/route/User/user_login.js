const express=require("express")
const route =express.Router()
const Registration =require("../../model/user_registerSchema")
const bcrypt = require('bcrypt');
const dotenv=require("dotenv")
dotenv.config()
const jwt =require("jsonwebtoken")



route.post("/user_login",async(req,res)=>{
      
    const {email,password}=req.body
    try {
    if(email && password){
        const data=await Registration.findOne({email:email})
        if(data){
            const match = await bcrypt.compare(password, data.password);
            if(match===true){     
                jwt.sign({data},process.env.USERJWT,{expiresIn:"24h"},(err,token)=>{
                    if(err){
                        res.send({ mess: "error",status: 400, text: err.message });
                    }else{
                        res.send({ mess: "success",status: 200, text: "Login Complete", id:data._id ,token:token });
                        res.cookie("token", token, {
                            httpOnly: true, // Prevents access via JavaScript
                            secure: true, // Use only in HTTPS
                            sameSite: "Strict", // CSRF protection
                            maxAge: 60 * 60 * 1000 // 1 hour expiry
                        });
                    }
                })
            }else{
                res.send({ mess: "error",status: 400, text: "Password Not Match" });
            }
        }else{ 
           res.send({ mess: "error",status: 400, text: "Please Register Now" });
        }
    }else{
        res.send({ mess: "error",status: 400, text: "Please Send The Valid ID" });
    }
} catch (err) {
    res.send({ mess: "error",status: 400, text: err.message });
  }

})

module.exports=route