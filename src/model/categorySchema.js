const mongoose=require("mongoose")


const catagorySchema=new mongoose.Schema({
  login_id:{
    type:String
   },
   product_Catagory_Image:{
    type:String
   },
   product_Catagory_Name:{
    type:String
   }
},{
    timestamps:true
}) 
const CatagorySchema=new mongoose.model("admin_catagory",catagorySchema)
module.exports=CatagorySchema