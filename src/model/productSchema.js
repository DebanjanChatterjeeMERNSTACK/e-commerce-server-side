const mongoose = require("mongoose")


const Productshema = new mongoose.Schema({

    login_id: {
        type: String
    },
    product_Title: {
        type: String
    },
    product_Description: {
        type: String
    },
    product_Category: {
        type: String
    },
    product_Selling_Price: {
        type: String
    },
    product_Main_Price: {
        type: String
    },
    product_Stock: {
        type: String
    },
    product_Image: {
        type: Array
    },
    product_Quantity:{
        type:String
    },
    product_unit:{
        type:String
    },
    product_variant:{
        type:Array
    },
    product_hit:{
        type:String
    },
    product_Offer_Percentage:{
        type:String
    },
    product_Brand:{
        type:String
    },
    product_Warranty_Information:{
        type:String
    },
    product_Shipping_Information:{
        type:String
    },
    product_Availability_Status:{
        type:String
    },
    product_Weight:{
        type:String
    }

}, {
    timestamps: true
})
const ProductShema = new mongoose.model("admin_product", Productshema)
module.exports = ProductShema


