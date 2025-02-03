const Catagorys=require("../model/categorySchema")



const Catagory_middleware = async(req, res, next) => {
    const product_Catagory_Name =req.body.product_Catagory_Name
    const id = req.body.login_id
    if (id == "undefined" || id === "" || !id) {
        res.send({ mess: "error" , status: 400, text: "Please Login" })
    } else if (id) {
        if(product_Catagory_Name){
           const Product_Catagory_Name =await Catagorys.findOne({product_Catagory_Name:product_Catagory_Name})
           if(Object.keys(Product_Catagory_Name).length>0){
           res.send({ mess: "error", status: 400, text: "Catagory Already Save" });
           }else{
            next()
           }
        }else{
            
            res.send({ mess: "error", status: 400, text: "Please Send The Catagory Name" });
        }
     
    } else {
        res.send({ mess: "error", status: 400, text: "Please Login" });
    }

}

module.exports = Catagory_middleware