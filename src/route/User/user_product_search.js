const express = require("express");
const route = express.Router();
const product = require("../../model/productSchema");

route.get("/user_product_search/:search", async (req, res) => {
  const search = req.params["search"];
  try {
      const searchRegex = new RegExp(".*" + search + ".*", "i");

      const Search = await product
        .find({
          $or: [
            { product_Title: searchRegex },
            { product_Selling_Price: searchRegex },
            { product_Stock: searchRegex },
            {product_Description:searchRegex}
          ]
        })
        .select("-login_id");
      if (Search.length > 0) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          Search: Search,
        });
      } else {
        res.send({ mess: "error", status: 400, text: "Result Not Found" });
      }
    
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

module.exports = route;
