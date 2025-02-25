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
    product_Sub_Category: {
        type: String
    },
    product_Selling_Price: {
        type: String
    },
    product_Main_Price: {
        type: String
    },
    product_Stock: {
        type: String,
        enum: ['In Stock', 'Out Stock'],
    },
    product_Image: {
        type: Array
    },
    product_Quantity:{
        type:String
    },
    product_unit:{
        type:String,
        enum: ['Milli Liter', 'Liter' ,'Kg' , 'Gm' ,'Pieces', 'Paired'],
    },
    product_variant:{
        type:Array
    },
    product_hit:{
        type:String,
        enum: ['Best Seller', 'Offer Product', 'New Arrivals'],
    },
    product_color:{
        type:Array
    },
    product_Offer_Percentage:{
        type:String
    },
    product_Brand:{
        type:String
    },
    product_SKU:{
        type:String
    },
    product_Warranty_Information:{
        type:String,
        enum: ['None','1 mounth', '6 mounth', '1 year' ,'3 year' , '5 year'],
    },
    product_Shipping_Information:{
        type:String,
        enum: ['2 day', '3 days', '5 days' ,'7 days'],

    },
    product_rating:{
      type:String,
      enum: ['3', '4', '5 ']
    },
    product_Weight:{
        type:String
    },
    product_Weight_units:{
        type:String,
        enum: ['Kg' , 'Gm'],
    },
    product_SEO_Title:{
        type:String
    },
    product_SEO_Description:{
        type:String
    },
    product_SEO_Keywords:{
        type:String
    }


}, {
    timestamps: true
})
const ProductShema = new mongoose.model("admin_product", Productshema)
module.exports = ProductShema


