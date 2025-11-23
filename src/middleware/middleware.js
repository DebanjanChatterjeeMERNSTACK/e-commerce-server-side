const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const middleware = (req, res, next) => {
  const token = req.headers["auth"]
  // const login_id = req.headers["login_id"];
try{
  if (token) {
    jwt.verify(token, process.env.JwTKEY, (err, valid) => {
      if (valid) {
        next()
      } else {
        res.send({ mess: "error" , status: 400, text: "Please Login" })
      }
    })
  } else {
    res.send({ mess: "error"  , status: 400,text: "Please Login"})
  }

} catch (err) {
  res.send({ mess: "error", status: 400, text: err.message });
}
}


module.exports = middleware