const express = require("express");
const route = express.Router();
const Cart = require("../../model/user_cartSchema");
const user_middileware = require("../../middleware/user_middleware");

route.post("/user_cart", user_middileware, (req, res) => {
  const { user_login_id, product_id, quentity, price } = req.body;

  try {
    if (
      user_login_id == "undefined" ||
      user_login_id === "" ||
      !user_login_id
    ) {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    } else {
      const user_cart = new Cart({
        user_login_id: user_login_id,
        product: product_id,
        quentity: quentity,
        price: price,
      });
      user_cart.save().then(() => {
        res.send({
          mess: "success",
          status: 200,
          text: "Cart Save Successfull",
        });
      });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.get("/user_cart_get", user_middileware, (req, res) => {
  const user_login_id = req.headers["user_login_id"];
  try {
    if (
      user_login_id == "undefined" ||
      user_login_id === "" ||
      !user_login_id
    ) {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    } else {
      const user_cart = new Cart.find({
        user_login_id: user_login_id,
      }).populate("product");

      if (user_cart.length > 0) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          user_cart: user_cart,
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Cart Not Found",
        });
      }
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});


route.post("/user_cary_delete", async (req, res) => {
  const id = req.body.id;

  try {
    
    const cart = await Cart.findOneAndDelete({ _id: id }, { _id: id });
    if (cart) {
      res.send({
        mess: "success",
        status: 200,
        text: "Permanent Delete Successfull",
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Send Correct Id" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});
