const express = require("express");
const route = express.Router();
const About = require("../model/aboutSchema");
const middleware = require("../middleware/middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: "src/about_image",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

route.post("/add_about", upload.single("about_Image"), async (req, res) => {
  const { login_id, about_Title, about_Description } = req.body;
 
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const data = await About.find({ login_id: login_id }).countDocuments();
      if (data === 1) {
        return res.send({
          mess: "error",
          status: 400,
          text: "You Have Already Submit Your About ",
        });
      }

      if (req.file) {
        const about_Image = `${process.env.URL}/about/${req.file.filename}`;
        const about = await About({
          login_id: login_id,
          about_Title: about_Title,
          about_Description: about_Description,
          about_Image: about_Image,
        });
        about.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "About Save Successfull",
          });
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "About Image Please Upload",
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
route.get("/get_about", async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const about = await About.findOne({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");
      if (about) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          aboutdata: about,
        });
      } else {
        res.send({ mess: "error", status: 400, text: "About Not Found" });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.post("/about_update", upload.single("about_Image"), async (req, res) => {
  const { id, about_Title, about_Description } = req.body;
  try {
    if (req.file) {
      const about_Image = `${process.env.URL}/about/${req.file.filename}`;
      const about = await About.findOneAndUpdate(
        { _id: id },
        {
          about_Image: about_Image,
          about_Title: about_Title,
          about_Description: about_Description,
        }
      );
      if (about) {
        const delete_Image = about.about_Image.split("/");
        fs.unlink(`src/about_image/${delete_Image[4]}`, (err) => {
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
      const about = await About.findOneAndUpdate(
        { _id: id },
        {
          about_Title: about_Title,
          about_Description: about_Description,
        }
      );
      if (about) {
        res.send({ mess: "success", status: 200, text: "Update complete" });
      } else {
        res.send({ mess: "error", status: 400, text: "Please Correct Id" });
      }
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});


module.exports = route;
