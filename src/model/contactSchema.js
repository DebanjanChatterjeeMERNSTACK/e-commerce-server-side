const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({

    login_id: {
        type: String
    },
    Address: {
        type: String
    },
    Phone_number: {
        type: String
    },
    Email_id: {
        type: String
    }

}, {
    timestamps: true
})
const ContactSchema = new mongoose.model("admin_contact", contactSchema)
module.exports = ContactSchema