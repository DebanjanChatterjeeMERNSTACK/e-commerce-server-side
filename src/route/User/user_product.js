const express = require("express");
const route = express.Router();
const Product =require("../../model/productSchema")

route.get("/user_product_get", async (req, res) => {

    try {
    
        const product = await Product.find({ product_Delete: 0 })
          .sort({
            _id: -1,
          })
          .select("-login_id");
        if (product.length > 0) {
          res.send({
            mess: "success",
            status: 200,
            text: "Send Success",
            product: product,
          });
        } else {
          res.send({
            mess: "error",
            status: 400,
            text: "Product Not Found",
          });
        }
     
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }
  });

  module.exports=route