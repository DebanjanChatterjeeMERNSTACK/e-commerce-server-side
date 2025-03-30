const express = require("express");
const route = express.Router();
const Slider = require("../model/sliderschema");
const middleware = require("../middleware/middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: "src/slider_image",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

route.post("/add_slider", upload.single("slider_Image"), async (req, res) => {
  const { login_id, slider_Title, slider_Description } =
    req.body;

  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      if (req.file) {
        const slider_Image = `${process.env.URL}/slider/${req.file.filename}`;
        const slider = await Slider({
          login_id: login_id,
          slider_Title: slider_Title,
          slider_Description: slider_Description,
          slider_Image: slider_Image,
        });
        slider.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "Slider Save Successfull",
          });
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Slider Image Please Upload",
        });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

// middleware
route.get("/get_slider", async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const slider = await Slider.find({ login_id: login_id }).sort({
        _id: -1,
      }).select('-login_id');
      if (slider.length>0) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          slider: slider,
        });
      } else {
        res.send({ mess: "error", status: 400, text: "Slider Not Found" });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});



route.get("/slider_edit/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const slider = await Slider.findOne({ _id: id }).select('-login_id');
    if (slider) {
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        slider: slider,
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});



route.post(
  "/slider_update",
  upload.single("slider_Image"),
  async (req, res) => {
    const { id, slider_Title, slider_Description } = req.body;
    try {
      if (req.file) {
        const slider_Image = `${process.env.URL}/slider/${req.file.filename}`;
        const slider = await Slider.findOneAndUpdate(
          { _id: id },
          {
            slider_Image: slider_Image,
            slider_Title: slider_Title,
            slider_Description: slider_Description,
           
          }
        );
        if (slider) {
          const delete_Image = slider.slider_Image.split("/");
          fs.unlink(`src/slider_image/${delete_Image[4]}`, (err) => {
            if (err) {
              throw err;
            } else {
              res.send({ mess: "success", status: 200, text: "Update complete" });
            }
          });
        } else {
          res.send({ mess: "error", status: 400, text: "Please Correct Id" });
        }
      } else {
        const slider = await Slider.findOneAndUpdate(
          { _id: id },
          {
            slider_Title: slider_Title,
            slider_Description: slider_Description,
          }
        );
        if (slider) {
          res.send({ mess: "success", status: 200, text: "Update complete" });
        } else {
          res.send({ mess: "error", status: 400, text: "Please Correct Id" });
        }

      }
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }
  }
);



route.post("/slider_delete", async (req, res) => {
  const id = req.body.id;
  try {
    const slider = await Slider.findOneAndDelete({ _id: id }, { _id: id });
    if (slider) {
      const delete_Image = slider.slider_Image.split("/");
      fs.unlink(`src/slider_image/${delete_Image[4]}`, (err) => {
        if (err) {
          throw err;
        } else {
          res.send({ mess: "success", status: 200, text: "Delete Complete" });
        }
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Correct Id" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

module.exports = route;
