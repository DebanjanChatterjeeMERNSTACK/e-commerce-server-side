const mongoose = require("mongoose")

const registrationShema = new mongoose.Schema({
   username: {
      type: String
   },
   email: {
      type: String
   },
   password: {
      type: String
   }
}, {
   timestamps: true
})
const RegistrationShema = new mongoose.model("admin_registration", registrationShema)
module.exports = RegistrationShema