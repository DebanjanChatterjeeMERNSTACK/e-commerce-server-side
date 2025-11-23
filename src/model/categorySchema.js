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
   },
   product_SubCategory_Name:{
    type:Array
   },
   product_Catagory_Delete:{
    type:Number,
    default:0
   }
   
},{
    timestamps:true
}) 
const CatagorySchema=new mongoose.model("admin_catagory",catagorySchema)
module.exports=CatagorySchema