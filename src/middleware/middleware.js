const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const middleware = (req, res, next) => {
  const token = req.headers["auth"]
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
}


module.exports = middleware