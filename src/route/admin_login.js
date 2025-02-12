const express=require("express")
const route =express.Router()
const Registration =require("../model/registerSchema")
const bcrypt = require('bcrypt');
const dotenv=require("dotenv")
dotenv.config()
const jwt =require("jsonwebtoken")



route.post("/admin_login",async(req,res)=>{
      
    const {email,password}=req.body
    try {
    if(email && password){
        const data=await Registration.findOne({email:email})
        if(data){
            const match = await bcrypt.compare(password, data.password);
            if(match===true){     
                jwt.sign({data},process.env.JWTKEY,{expiresIn:"24h"},(err,tokan)=>{
                    if(err){
                        res.send({ mess: "error",status: 400, text: err.message });
                    }else{
                        res.send({ mess: "success",status: 200, text: "Login Complete", id:data._id ,token:tokan });
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