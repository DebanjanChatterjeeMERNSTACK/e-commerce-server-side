const express = require("express");
const route = express.Router();
const product = require("../model/productSchema");


route.get("/product_search/:search", async (req, res) => {
  const search = req.params["search"];
  const login_id = req.headers["login_id"];
  try {
    if (search && (login_id != "undefined" || login_id !== "" || !login_id)) {
      const searchRegex = new RegExp(".*" + search + ".*", "i");

      const Search = await product.find({$and:[
       { login_id: login_id},
       { $or: [
          { product_Title: searchRegex },
          { product_Selling_Price: searchRegex },
          { product_Stock: searchRegex },
        ]}
      ]
    }).select('-login_id');
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
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.get("/product_catagory_search/:search", async (req, res) => {
  const search = req.params["search"];
  const login_id = req.headers["login_id"];
  try {
    if (search && (login_id != "undefined" || login_id !== "" || !login_id)) {
      const searchRegex = new RegExp(".*" + search + ".*", "i");
      if (search !== "All") {
        const Search = await product.find({$and:[
          {login_id: login_id},
          {$or: [{ product_Category: searchRegex }]}]
        }).select('-login_id');

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
      } else {
        const Search = await product.find({
          login_id: login_id
        });
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          Search: Search,
        });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

module.exports = route;
