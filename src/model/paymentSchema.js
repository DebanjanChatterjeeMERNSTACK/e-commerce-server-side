const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

    login_id: {
        type: String
    },
    KEY_ID: {
        type: String
    },
    KEY_SECRET: {
        type: String
    },
    Cash:{
        type:Boolean
    }
}, {
    timestamps: true
})
const PaymentSchema = new mongoose.model("admin_payament_key", paymentSchema)
module.exports = PaymentSchema