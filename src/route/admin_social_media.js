const express = require("express");
const route = express.Router();
const Social = require("../model/socialSchema");
const middleware = require("../middleware/middleware");

route.post("/social_save", async (req, res) => {
  const { login_id, facebook, instragram, twitter ,youtube } = req.body;
  try {
    if (login_id) {
      const data = await Social.find({ login_id: login_id }).countDocuments();
      if (data == 1) {
        res.send({
          mess: "error",
          status: 400,
          text: "You Have Already Submit Your Social Media Link ",
        });
      } else {
        const social = await Social({
          login_id: login_id,
          facebook: facebook,
          instragram: instragram,
          twitter: twitter,
          youtube:youtube
        });
        social.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "Social Media Link Save Successfull",
          });
        });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

//middleware

route.get("/social_get", async (req, res) => {
  const login_id = req.headers["login_id"];

  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const social = await Social.find({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        social: social,
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});



route.get("/social_edit/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const social = await Social.findOne({ _id: id }).select("-login_id");
    if (social) {
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        social: social,
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



route.post("/social_update", async (req, res) => {
  const { id, facebook, instragram, twitter ,youtube } = req.body;
  try {
    const social = await Social.findOneAndUpdate(
      { id: id },
      { facebook: facebook, instragram: instragram, twitter: twitter,youtube:youtube }
    );
    if (social) {
      res.send({
        mess: "success",
        status: 200,
        text: "Social Media Link Update Successfull",
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



module.exports = route;
