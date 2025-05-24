const mongoose=require("mongoose")


const policySchema=new mongoose.Schema({
  login_id:{
    type:String
   },
   policy_name:{
    type:String
   },
   policy_contant:{
    type:String
   }
},{
    timestamps:true
}) 
const PolicySchema=new mongoose.model("admin_policy",policySchema)
module.exports=PolicySchema