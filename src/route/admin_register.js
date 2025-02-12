const express = require("express")
const route = express.Router()
const registration = require("../model/registerSchema")
const bcrypt = require('bcrypt');



route.post("/admin_resgitration", async (req, res) => {
    const { username, email, password } = req.body

  try{
    if (username && email && password) {
        const user = await registration.findOne({ email: email })
        if (user) {
            res.send({mess: "error",status:400,text:"Already Register "})
        } else {
            const saltRounds = 10
            const hass_password =await bcrypt.hash(password, saltRounds)
            const Data = await registration({ username: username, email: email, password: hass_password })
            Data.save().then(() => {
                res.send({mess: "success",status:200,text:"Register Complete"})
            })
        }
    } else {
        res.send({mess: "error",status:400,text:"Please Fill All Filed"})
    }
}catch(err){
    res.send({ mess: "error",status:400, text: err.message });
}


})



module.exports = route