const mongoose = require("mongoose")

const logoSchema = new mongoose.Schema({

    login_id: {
        type: String
    },
    logo: {
        type: String
    },
}, {
    timestamps: true
})
const LogoSchema = new mongoose.model("admin_logo", logoSchema)
module.exports = LogoSchema