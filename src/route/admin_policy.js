const Policy = require("../model/policy");
const express = require("express");
const route = express.Router();

route.post("/add_terms", async (req, res) => {
  const { login_id, terms_contant } = req.body;
  // console.log(req.body)
  // return
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
          login_id:login_id,
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
      const Policies = await Policy.findOne({ login_id: login_id ,policy_name: "Terms And Conditions",})
        .sort({
          _id: -1,
        })
        .select("-login_id");
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        policy: Policies,
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});


// route.get("/terms_edit/:id", async (req, res) => {
//     const id = req.params["id"];
//     try {
//       const policy = await Policy.findOne({id:_id, policy_name: "Terms And Conditions" });
//       if (policy) {
//         res.send({
//           mess: "success",
//           status: 200,
//           text: "Send Success",
//           policy: policy,
//         });
//       } else {
//         res.send({
//           mess: "error",
//           status: 400,
//           text: "Please Send Correct Id",
//         });
//       }
//     } catch (err) {
//       res.send({ mess: "error", status: 400, text: err.message });
//     }
//   });

route.post("/terms_update",async (req, res) => {
    const { terms_contant } = req.body;
    // console.log(req.body)
    // return
    try {

        const Policies = await Policy.findOneAndUpdate({policy_name: "Terms And Conditions"},{policy_contant:terms_contant})
        if (Policies) {
            res.send({
              mess: "success",
              status: 200,
              text: "Terms And Conditions Update Successfull",
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
  





  route.post("/add_privacy", async (req, res) => {
    const { login_id, privacy_contant } = req.body;
    // console.log(req.body)
    // return
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
            login_id:login_id,
            policy_name: "Privacy Policy",
            policy_contant: privacy_contant,
          });
          Terms.save().then(() => {
            res.send({
              mess: "success",
              status: 200,
              text: "Privacy Policy Save Successfull",
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

  route.post("/privacy_update",async (req, res) => {
    const { privacy_contant } = req.body;
    // console.log(req.body)
    // return
    try {

        const Policies = await Policy.findOneAndUpdate({policy_name: "Privacy Policy"},{policy_contant:privacy_contant})
        if (Policies) {
            res.send({
              mess: "success",
              status: 200,
              text: "Privacy Policy Update Successfull",
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

  /// middleware
  route.get("/privacy_get",async (req, res) => {
    const login_id = req.headers["login_id"];
    try {
      if (login_id != "undefined" || login_id !== "" || !login_id) {
        const Policies = await Policy.findOne({ login_id: login_id ,policy_name: "Privacy Policy",})
          .sort({
            _id: -1,
          })
          .select("-login_id");
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          policy: Policies,
        });
      } else {
        res.send({ mess: "error", status: 400, text: "Please Login" });
      }
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }
  });





  route.post("/add_shipping", async (req, res) => {
    const { login_id, shipping_contant } = req.body;
    // console.log(req.body)
    // return
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
            login_id:login_id,
            policy_name: "Shipping Policy",
            policy_contant: shipping_contant,
          });
          Terms.save().then(() => {
            res.send({
              mess: "success",
              status: 200,
              text: "Shipping Policy Save Successfull",
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


  route.post("/shipping_update",async (req, res) => {
    const { shipping_contant } = req.body;
    // console.log(req.body)
    // return
    try {

        const Policies = await Policy.findOneAndUpdate({policy_name: "Shipping Policy"},{policy_contant:shipping_contant})
        if (Policies) {
            res.send({
              mess: "success",
              status: 200,
              text: "Shipping Policy Update Successfull",
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

 /// middleware
 route.get("/shipping_get",async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const Policies = await Policy.findOne({ login_id: login_id ,policy_name: "Shipping Policy",})
        .sort({
          _id: -1,
        })
        .select("-login_id");
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        policy: Policies,
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});







 /// middleware
 route.get("/refund_get",async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const Policies = await Policy.findOne({ login_id: login_id ,policy_name: "Refund Policy",})
        .sort({
          _id: -1,
        })
        .select("-login_id");
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        policy: Policies,
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.post("/refund_update",async (req, res) => {
  const { refund_contant } = req.body;
  // console.log(req.body)
  // return
  try {

      const Policies = await Policy.findOneAndUpdate({policy_name: "Refund Policy"},{policy_contant:refund_contant})
      if (Policies) {
          res.send({
            mess: "success",
            status: 200,
            text: "Refund Policy Update Successfull",
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

route.post("/add_refund", async (req, res) => {
  const { login_id, refund_contant } = req.body;
  // console.log(req.body)
  // return
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
          login_id:login_id,
          policy_name: "Refund Policy",
          policy_contant: refund_contant,
        });
        Terms.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "Refund Policy Save Successfull",
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



  module.exports=route

  