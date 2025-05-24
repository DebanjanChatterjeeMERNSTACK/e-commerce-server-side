const mongoose = require("mongoose")

const faqSchema = new mongoose.Schema({

    login_id: {
        type: String
    },
    Question: {
        type: String
    },
    Answer: {
        type: String
    }
}, {
    timestamps: true
})
const FaqSchema = new mongoose.model("admin_faq", faqSchema)
module.exports = FaqSchema