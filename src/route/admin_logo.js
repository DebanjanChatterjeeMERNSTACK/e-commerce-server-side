const express = require("express");
const route = express.Router();
const Logo = require("../model/logoSchema");

const middleware = require("../middleware/middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: "src/logo_image",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

route.post("/logo_save", upload.single("logo_Image"), async (req, res) => {
  const { login_id } = req.body;

  try {
    if (login_id) {
      const data = await Logo.find({ login_id: login_id }).countDocuments();
      if (data == 1) {
        res.send({
          mess: "error",
          status: 400,
          text: "You Have Already Submit Your Logo ",
        });
      } else {
        if (req.file) {
          const Logo_image = `${process.env.URL}/logo/${req.file.filename}`;

          const logo = await Logo({
            login_id: login_id,
            logo: Logo_image,
          });
          logo.save().then(() => {
            res.send({
              mess: "success",
              status: 200,
              text: "Logo Save Successfull",
            });
          });
        } else {
          res.send({
            mess: "error",
            status: 400,
            text: "Logo Image Please Upload",
          });
        }
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.get("/logo_edit/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const logo = await Logo.findOne({ _id: id }).select("-login_id");
    if (logo) {
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        logo: logo,
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

route.post(
  "/logo_update",
  upload.single("logo_Image"),
  async (req, res) => {
    const { id } = req.body;

    try {
     
        const logo = `${process.env.URL}/logo/${req.file.filename}`;

        const logoUpdate = await Logo.findOneAndUpdate(
          { _id: id },
          {
            logo: logo,
          }
        );

        if (logoUpdate) {
          const delete_Image =
            logoUpdate.logo.split("/");
          fs.unlink(`src/logo_image/${delete_Image[4]}`, (err) => {
            if (err) {
              throw err;
            } else {
              res.send({
                mess: "success",
                status: 200,
                text: "Logo Update Successfull",
              });
            }
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
  }
);

/// middleware

route.get("/logo_get", async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const logo = await Logo.findOne({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");

      if (logo) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          logo: logo,
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Logo Not Found",
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
