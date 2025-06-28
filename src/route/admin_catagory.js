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
  destination: "src/catagory_image",
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
  catagory_middileware,
  upload.single("product_Catagory_Image"),
  
  async (req, res) => {
    const {
      login_id,
      product_Catagory_Name,
      product_Meta_Title,
      product_Meta_Description,
      product_Meta_Keywords,
      product_Category_slug,
      product_Category_order,
      product_Category_image_menu,
      product_Category_main_menu
    } = req.body;
    const product_SubCategory_Name = JSON.parse(
      req.body.product_SubCategory_Name
    );
    
    
    try {
      if (login_id) {
        if (req.file) {
          const product_Catagory_Image = `${process.env.URL}/catagory/${req.file.filename}`;

          const catagory = await Catagory({
            login_id: login_id,
            product_Catagory_Name: product_Catagory_Name,
            product_Catagory_Image: product_Catagory_Image,
            product_SubCategory_Name: product_SubCategory_Name,
            product_Meta_Title: product_Meta_Title,
            product_Meta_Description: product_Meta_Description,
            product_Meta_Keywords: product_Meta_Keywords,
            product_Category_slug: product_Category_slug,
            product_Category_order: product_Category_order,
            product_Category_image_menu: product_Category_image_menu,
            product_Category_main_menu:product_Category_main_menu
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
    const category = await Catagory.findOne({ _id: id }).select("-login_id");
    if (category) {
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
    const {
      id,
      product_Catagory_Name,
      product_Meta_Title,
      product_Meta_Description,
      product_Meta_Keywords,
      product_Category_slug,
      product_Category_order,
      product_Category_image_menu,
      product_Category_main_menu
    } = req.body;
    const product_SubCategory_Name = JSON.parse(
      req.body.product_SubCategory_Name
    );
    try {
      if (req.file) {
        const product_Catagory_Images = `${process.env.URL}/catagory/${req.file.filename}`;

        const updatedCategory = await Catagory.findOneAndUpdate(
          { _id: id },
          {
            product_Catagory_Name: product_Catagory_Name,
            product_Catagory_Image: product_Catagory_Images,
            product_SubCategory_Name: product_SubCategory_Name,
            product_Meta_Title: product_Meta_Title,
            product_Meta_Description: product_Meta_Description,
            product_Meta_Keywords: product_Meta_Keywords,
            product_Category_slug: product_Category_slug,
            product_Category_order: product_Category_order,
            product_Category_image_menu: product_Category_image_menu,
            product_Category_main_menu:product_Category_main_menu
          }
        );

        if (updatedCategory) {
          const delete_Image =
            updatedCategory.product_Catagory_Image.split("/");
          fs.unlink(`src/catagory_image/${delete_Image[4]}`, (err) => {
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
            product_SubCategory_Name: product_SubCategory_Name,
            product_Meta_Title: product_Meta_Title,
            product_Meta_Description: product_Meta_Description,
            product_Meta_Keywords: product_Meta_Keywords,
            product_Category_slug: product_Category_slug,
            product_Category_order: product_Category_order,
            product_Category_image_menu: product_Category_image_menu,
            product_Category_main_menu:product_Category_main_menu
          }
        );

        if (updatedCategory) {
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
      const catagory = await Catagory.find({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");

      if (catagory.length > 0) {
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

route.post("/catagory_update_delete", async (req, res) => {
  const { id, product_Catagory_delete_update } = req.body;

  try {
    const catagory_Delete = await Catagory.findOneAndUpdate(
      { _id: id },
      { product_Catagory_Delete: product_Catagory_delete_update }
    );
    if (catagory_Delete) {
      res.send({
        mess: "success",
        status: 200,
        text: "Delete Successfull",
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Send Correct Id" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.post("/catagory_restore", async (req, res) => {
  const { id, product_Catagory_delete_update } = req.body;

  try {
    const catagory_Delete = await Catagory.findOneAndUpdate(
      { _id: id },
      { product_Catagory_Delete: product_Catagory_delete_update }
    );
    if (catagory_Delete) {
      res.send({
        mess: "success",
        status: 200,
        text: "Restore Successfull",
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Send Correct Id" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.post("/catagory_delete", async (req, res) => {
  const id = req.body.id;

  try {
    const catagory = await Catagory.findOneAndDelete({ _id: id }, { _id: id });
    if (catagory) {
      const delete_Image = catagory.product_Catagory_Image.split("/");
      fs.unlink(`src/catagory_image/${delete_Image[4]}`, (err) => {
        if (err) {
          throw err;
        } else {
          res.send({
            mess: "success",
            status: 200,
            text: "Permanent Delete Successfull",
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
