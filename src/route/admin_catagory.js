const express = require("express");
const route = express.Router();
const Catagory = require("../model/categorySchema");
const catagory_middileware = require("../middleware/catagory_middileware");
const middleware = require("../middleware/middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: "src/catagory",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//  catagory_middileware
route.post(
  "/catagory_save",
  upload.single("product_Catagory_Image"),
  catagory_middileware,
  async (req, res) => {
    const { login_id, product_Catagory_Name } = req.body;

    try {
      if (login_id) {
        if (req.file) {
          const product_Catagory_Image = `${process.env.URL}/catagory/${req.file.filename}`;

          const catagory = await Catagory({
            login_id: login_id,
            product_Catagory_Name: product_Catagory_Name,
            product_Catagory_Image: product_Catagory_Image,
          });
          catagory.save().then(() => {
            res.send({
              mess: "success",
              status: 200,
              text: "Catarory Save Successfull",
            });
          });
        } else {
          res.send({
            mess: "error",
            status: 400,
            text: "Catarory Image Please Upload",
          });
        }
      } else {
        res.send({ mess: "error", status: 400, text: "Please Login" });
      }
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }
  }
);

route.get("/category_edit/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const category = await Catagory.findOne({ _id: id }).select('-login_id');
    if (Object.keys(category).length >0) {
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        category: category,
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
  "/catagory_update",
  upload.single("product_Catagory_Image"),
  async (req, res) => {
    const { id, product_Catagory_Name } = req.body;

    try {
      if (req.file) {
        const product_Catagory_Images = `${process.env.URL}/catagory/${req.file.filename}`;

        const updatedCategory = await Catagory.findOneAndUpdate(
          { _id: id },
          {
            product_Catagory_Name: product_Catagory_Name,
            product_Catagory_Image: product_Catagory_Images,
          }
        );
      
        if (Object.keys(updatedCategory).length>0) {
          
          const delete_Image =
            updatedCategory.product_Catagory_Image.split("/");
          fs.unlink(`src/catagory/${delete_Image[4]}`, (err) => {
            if (err) {
              throw err;
            } else {
              res.send({
                mess: "success",
                status: 200,
                text: "Catarory Update Successfull",
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
      } else {

        const updatedCategory = await Catagory.findOneAndUpdate(
          { _id: id },
          {
            product_Catagory_Name: product_Catagory_Name,

          }
        );
       
        if (Object.keys(updatedCategory).length>0) {
          res.send({
            mess: "success",
            status: 200,
            text: "Catarory Update Successfull",
          });
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
  }
);

/// middleware

route.get("/catagory_get", async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const catagory = await Catagory.find({ login_id: login_id }).sort({
        _id: -1,
      }).select('-login_id');

      if (catagory.length>0) {
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
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.post("/catagory_delete", async (req, res) => {
  const id = req.body.id;
  try {
    const catagory = await Catagory.findOneAndDelete({ _id: id }, { _id: id });
    if (Object.keys(catagory).length>0) {
      const delete_Image = catagory.product_Catagory_Image.split("/");
      fs.unlink(`src/catagory/${delete_Image[4]}`, (err) => {
        if (err) {
          throw err;
        } else {
          res.send({
            mess: "success",
            status: 200,
            text: "Delete Successfull",
          });
        }
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Send Correct Id" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

module.exports = route;
