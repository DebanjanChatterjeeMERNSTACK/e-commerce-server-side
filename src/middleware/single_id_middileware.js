const Register=require("../model/registerSchema")



const single_id_register = async(req, res, next) => {
    const id = req.body.login_id

  try{

    if (id == "undefined" || id === "" || !id) {
        res.send({ mess: "error" , status: 400, text: "Please Login" })
    } else if (id) {
           const single_id =await Register.findOne({ _id: id });
           if(single_id){
           next()
           }else{
            res.send({ mess: "error" , status: 400, text: "Please Login" })
           }
     
    } else {
        res.send({ mess: "error", status: 400, text: "Please Login" });
    }
} catch (err) {
    res.send({ mess: "error",status: 400, text: err.message });
  }

}

module.exports = single_id_register