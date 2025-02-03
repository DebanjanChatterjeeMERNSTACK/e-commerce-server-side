const express = require("express");
const route = express.Router();
const registration = require("../model/registerSchema");
const bcrypt = require("bcrypt");

route.post("/admin_forget", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email && password) {
      const data = await registration.findOne({ email: email });
      if (Object.keys(data).length>0) {
        const saltRounds = 10;
        const hass_password = await bcrypt.hash(password, saltRounds);
        const updata = await registration.findOneAndUpdate(
          { email: email },
          { password: hass_password }
        );
        if (Object.keys(updata).length>0) {
          res.send({
            mess: "success",
            status: 200,
            text: "Password Change And Login You",
          });
        } else {
          res.send({
            mess: "error",
            status: 400,
            text: "Email Is Wrong Enter",
          });
        }
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Please Send Correct Id",
        });
      }
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

module.exports = route;
