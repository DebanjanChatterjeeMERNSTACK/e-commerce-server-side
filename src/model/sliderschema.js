const mongoose = require("mongoose")


const sliderSchema = new mongoose.Schema({
   login_id: {
        type: String
    },
    slider_Image: {
        type: String
    },
    slider_Title: {
        type: String
    },
    slider_Description: {
        type: String
    },
    product_Catagory: {
        type: String
    }
}, {
    timestamps: true
})
const SliderSchema = new mongoose.model("admin_slider", sliderSchema)
module.exports = SliderSchema