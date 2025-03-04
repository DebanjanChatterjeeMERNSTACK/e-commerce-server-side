const express = require("express");
const route = express.Router();
const Catagory = require("../../model/categorySchema");

route.get("/user_catagory_get", async (req, res) => {
  try {
    const catagory = await Catagory.find({ product_Catagory_Delete: 0 })
      .sort({
        _id: -1,
      })
      .select("-login_id");

    if (catagory.length > 0) {
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        catagory: catagory,
      });
    } else {
      res.send({
        mess: "error",
        status: 400,
        text: "Category Not Found",
      });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});
