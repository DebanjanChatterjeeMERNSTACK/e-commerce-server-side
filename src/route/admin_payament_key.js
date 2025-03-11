const express = require("express");
const route = express.Router();
const Payment = require("../model/paymentSchema");

route.post("/add_payment_key", async (req, res) => {
  try {
    const { login_id, KEY_ID, KEY_SECRET ,Cash} = req.body;

    if (!login_id && !KEY_ID && !KEY_SECRET && !Cash) {
      return res.send({
        mess: "error",
        status: 400,
        text: "Please Fill All Field",
      });
    }
    const data = await Payment.find({ login_id: login_id }).countDocuments();
    if (data == 1) {
      res.send({
        mess: "error",
        status: 400,
        text: "You Have Already Submit Your Payment Key ",
      });
    } else {
      const payment = await Payment({
        login_id: login_id,
        KEY_ID: KEY_ID,
        KEY_SECRET: KEY_SECRET,
        Cash:Cash
      });
      payment.save().then(() => {
        res.send({
          mess: "success",
          status: 200,
          text: "Payment Key Save Successfull",
        });
      });
    }
  } catch (error) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});


route.post("/payment_key_update", async (req, res) => {
    const { id, KEY_ID, KEY_SECRET ,Cash} = req.body;
  
    try {
        if (!id && !KEY_ID && !KEY_SECRET && !Cash) {
            return res.send({
              mess: "error",
              status: 400,
              text: "Please Fill All Field",
            });
          }

      const payment = await Payment.findOneAndUpdate(
        { _id: id },
       { 
        KEY_ID: KEY_ID,
        KEY_SECRET: KEY_SECRET,
        Cash:Cash
       }
      );
      if (payment) {
        res.send({
          mess: "success",
          status: 200,
          text: "Payment Key Update Successfull",
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Please Send Correct Id",
        });
      }
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }
  });


  route.get("/payment_key_get", async (req, res) => {
    const login_id = req.headers["login_id"];
  
    try {

      if (login_id != "undefined" || login_id !== "" || !login_id) {
        const Payment = await Payment.find({ login_id: login_id })
          .sort({
            _id: -1,
          })
          .select("-login_id");
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          Payment: Payment,
        });
      } else {
        res.send({ mess: "error", status: 400, text: "Please Login" });
      }
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }

  });


  
module.exports = route;