const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({

    login_id: {
        type: String
    },
    Address1: {
        type: String
    },
    Address2: {
        type: String
    },
    Phone_number1: {
        type: String
    },
    Phone_number2: {
        type: String
    },
    Email_id1: {
        type: String
    },
    Email_id2: {
        type: String
    },
    Map: {
        type: String
    }

}, {
    timestamps: true
})
const ContactSchema = new mongoose.model("admin_contact", contactSchema)
module.exports = ContactSchema