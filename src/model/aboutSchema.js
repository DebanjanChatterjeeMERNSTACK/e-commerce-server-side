const mongoose = require("mongoose")


const aboutSchema = new mongoose.Schema({
   login_id: {
        type: String
    },
    about_Image: {
        type: String
    },
    about_Title: {
        type: String
    },
    about_Description: {
        type: String
    }
}, {
    timestamps: true
})
const AboutSchema = new mongoose.model("admin_about", aboutSchema)
module.exports = AboutSchema