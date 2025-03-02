const Policy = require("../model/policy");
const express = require("express");
const route = express.Router();

route.post("/add_terms", async (req, res) => {
  const { login_id, terms_contant } = req.body;

  try {
    if (login_id) {
      const data = await Policy.find({ login_id: login_id }).countDocuments();
      if (data === 4) {
        res.send({
          mess: "error",
          status: 400,
          text: "You Have Already Submit Your Policy ",
        });
      } else {
        const Terms = await Policy({
          policy_name: "Terms And Conditions",
          policy_contant: terms_contant,
        });
        Terms.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "Terms And Conditions Save Successfull",
          });
        });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (error) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});


/// middleware
route.get("/terms_get",async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const Policy = await Policy.findOne({ login_id: login_id ,policy_name: "Terms And Conditions",})
        .sort({
          _id: -1,
        })
        .select("-login_id");
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        policy: Policy,
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});


route.get("/terms_edit/:id", async (req, res) => {
    const id = req.params["id"];
    try {
      const policy = await Policy.findOne({id:_id, policy_name: "Terms And Conditions" });
      if (policy) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          policy: policy,
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

route.get("/terms_update",async (req, res) => {
    const { terms_contant } = req.body;
    try {

        const Policy = await Policy.findOneAndUpdate({policy_name: "Terms And Conditions"},{policy_contant:terms_contant})
        if (Policy) {
            res.send({
              mess: "success",
              status: 200,
              text: "Contact Update Successfull",
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
  
