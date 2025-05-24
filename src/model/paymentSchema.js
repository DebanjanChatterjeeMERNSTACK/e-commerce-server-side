const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

    login_id: {
        type: String
    },
    delivery_Charge: {
        type: Number
    },
    Tax: {
        type: Number
    },
    Cash:{
        type:Boolean
    }
}, {
    timestamps: true
})
const PaymentSchema = new mongoose.model("admin_payament_key", paymentSchema)
module.exports = PaymentSchema