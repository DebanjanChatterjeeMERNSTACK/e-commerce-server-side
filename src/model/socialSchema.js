const mongoose = require("mongoose")

const socialSchema = new mongoose.Schema({

    login_id: {
        type: String
    },
    facebook: {
        type: String
    },
    instragram: {
        type: String
    },
    twitter: {
        type: String
    },
    youtube:{
        type: String  
    }

}, {
    timestamps: true
})
const SocialSchema = new mongoose.model("admin_social", socialSchema)
module.exports = SocialSchema