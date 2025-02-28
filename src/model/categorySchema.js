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
   product_Meta_Title:{
    type:String
   },
   product_Meta_Description:{
    type:String
   },
   product_Meta_Keywords:{
    type:String
   },
   product_Category_slug:{
    type:String
   },
   product_Category_order:{
    type:String
   },
   product_Category_image_menu:{
    type:String
   },
   product_Category_main_menu:{
    type:String
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