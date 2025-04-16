const mongoose=require("mongoose")


const fleximageSchema=new mongoose.Schema({
  login_id:{
    type:String
   },
   Flex_image_1:{
    type:String
   },
   Flex_image_2:{
    type:String
   },
   Flex_image_3:{
    type:Array
   },
   Flex_image_4:{
    type:String
   }
   
},{
    timestamps:true
}) 
const FleximageSchema=new mongoose.model("admin_fleximage",fleximageSchema)
module.exports=FleximageSchema