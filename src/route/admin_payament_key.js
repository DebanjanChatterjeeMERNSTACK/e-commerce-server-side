const express = require("express");
const route = express.Router();
const Payment = require("../model/paymentSchema");
const middleware = require("../middleware/middleware");

route.post("/add_payment_key", async (req, res) => {
  try {
    const { login_id, Tax, delivery_Charge ,Cash} = req.body;
    console.log(req.body)

    if (login_id && Tax && delivery_Charge) {
    const data = await Payment.find({ login_id: login_id }).countDocuments();
    if (data == 1) {
      res.send({
        mess: "error",
        status: 400,
        text: "You Have Already Submit Your Payment Details ",
      });
    } else {
      const payment = await Payment({
        login_id: login_id,
        Tax: Tax,
        delivery_Charge: delivery_Charge,
        Cash:Cash
      });
      payment.save().then(() => {
        res.send({
          mess: "success",
          status: 200,
          text: "Payment Details Save Successfull",
        });
      });
    }

  }else{
    res.send({
      mess: "error",
      status: 400,
      text: "Please Fill All Field",
    });
  }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});


route.post("/payment_key_update", async (req, res) => {
    const { id, delivery_Charge, Tax ,Cash} = req.body.payload;
  
    try {
        if (id && Tax && delivery_Charge ) {
           

      const payment = await Payment.findOneAndUpdate(
        { _id: id },
       { 
        Tax: Tax,
        delivery_Charge: delivery_Charge,
        Cash:Cash
       }
      );
      if (payment) {
        res.send({
          mess: "success",
          status: 200,
          text: "Payment Details Update Successfull",
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Please Send Correct Id",
        });
      }

    }else{
        res.send({
          mess: "error",
          status: 400,
          text: "Please Fill All Field",
        });
      }
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }
  });

 /// middleware
  route.get("/payment_key_get", async (req, res) => {
    const login_id = req.headers["login_id"];
  
    try {

      if (login_id != "undefined" || login_id !== "" || !login_id) {
        const Paymentdata = await Payment.findOne({ login_id: login_id })
          .sort({
            _id: -1,
          })
          .select("-login_id");
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          Payments: Paymentdata,
        });
      } else {
        res.send({ mess: "error", status: 400, text: "Please Login" });
      }
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }

  });


  
module.exports = route;