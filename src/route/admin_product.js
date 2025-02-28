const express = require("express");
const route = express.Router();
const Product = require("../model/productSchema");
const middleware = require("../middleware/middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
dotenv.config();

const storage = multer.diskStorage({
  destination: "src/product_image",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${uuidv4()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//  Id_middleware
route.post(
  "/product_add",
  upload.array("product_Image", 10),
  async (req, res) => {
    const {
      login_id,
      product_Title,
      product_Description,
      product_Category,
      product_Sub_Category,
      product_Weight_units,
      product_Selling_Price,
      product_Main_Price,
      product_Stock,
      product_Quantity,
      product_Quantity_unit,
      product_hit,
      product_Offer_Percentage,
      product_Brand,
      product_SKU,
      product_rating,
      product_Warranty_Information,
      product_Shipping_Information,
      product_Weight,
      product_SEO_Title,
      product_SEO_Description,
      product_SEO_Keywords,
    } = req.body;
    const product_color = JSON.parse(req.body.product_color);
    const product_variant = JSON.parse(req.body.product_variant);
    const product_Images = req.files;

    try {
      if (login_id != "undefined" || login_id !== "" || !login_id) {
        if (product_Images.length > 0) {
          const product_Image = product_Images.map((e) => {
            return `${process.env.URL}/upload/${e.filename}`;
          });
          const Products = await Product({
            login_id: login_id,
            product_Title: product_Title,
            product_Description: product_Description,
            product_Category: product_Category,
            product_Weight_units: product_Weight_units,
            product_Sub_Category: product_Sub_Category,
            product_Selling_Price: product_Selling_Price,
            product_SKU: product_SKU,
            product_color: product_color,
            product_rating: product_rating,
            product_Main_Price: product_Main_Price,
            product_Stock: product_Stock,
            product_Image: product_Image,
            product_Quantity: product_Quantity,
            product_Quantity_unit: product_Quantity_unit,
            product_variant: product_variant,
            product_hit: product_hit,
            product_Offer_Percentage: product_Offer_Percentage,
            product_Brand: product_Brand,
            product_Warranty_Information: product_Warranty_Information,
            product_Shipping_Information: product_Shipping_Information,
            product_Weight: product_Weight,
            product_SEO_Title: product_SEO_Title,
            product_SEO_Description: product_SEO_Description,
            product_SEO_Keywords: product_SEO_Keywords,
          });
          Products.save().then(() => {
            res.send({
              mess: "success",
              status: 200,
              text: "Product Save Successfull",
            });
          });
        } else {
          res.send({
            mess: "error",
            status: 400,
            text: "Product Image Please Upload",
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

//  middleware
route.get("/product_get", async (req, res) => {
  const login_id = req.headers["login_id"];
  // const login_id = req.body.login_id;
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const product = await Product.find({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");
      if (product.length > 0) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          product: product,
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Product Not Found",
        });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

route.get("/product_edit/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const product = await Product.findOne({ _id: id }).select("-login_id");
    if (product) {
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        product: product,
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
  "/product_update",
  upload.array("product_Image", 10),
  async (req, res) => {
    const {
      id,
      product_Title,
      product_Description,
      product_Category,
      product_Sub_Category,
      product_SKU,
      product_Weight_units,
      product_rating,
      product_Selling_Price,
      product_Main_Price,
      product_Stock,
      product_Quantity,
      product_Quantity_unit,
      product_hit,
      product_Offer_Percentage,
      product_Brand,
      product_Warranty_Information,
      product_Shipping_Information,
      product_Weight,
      product_SEO_Title,
      product_SEO_Description,
      product_SEO_Keywords,
    } = req.body;
    const product_color = JSON.parse(req.body.product_color);
    const product_variant = JSON.parse(req.body.product_variant);
    const product_Images = req.files;
    try {
      if (product_Images.length > 0) {
        const product_Image = product_Images.map((e) => {
          return `${process.env.URL}/upload/${e.filename}`;
        });

        const product = await Product.findOneAndUpdate(
          { _id: id },
          {
            product_Title: product_Title,
            product_Description: product_Description,
            product_Category: product_Category,
            product_Sub_Category: product_Sub_Category,
            product_SKU: product_SKU,
            product_Weight_units: product_Weight_units,
            product_color: product_color,
            product_rating: product_rating,
            product_Selling_Price: product_Selling_Price,
            product_Main_Price: product_Main_Price,
            product_Stock: product_Stock,
            product_Image: product_Image,
            product_Quantity: product_Quantity,
            product_Quantity_unit: product_Quantity_unit,
            product_variant: product_variant,
            product_hit: product_hit,
            product_Offer_Percentage: product_Offer_Percentage,
            product_Brand: product_Brand,
            product_Warranty_Information: product_Warranty_Information,
            product_Shipping_Information: product_Shipping_Information,
            product_Weight: product_Weight,
            product_SEO_Title: product_SEO_Title,
            product_SEO_Description: product_SEO_Description,
            product_SEO_Keywords: product_SEO_Keywords,
          }
        );
        if (product) {
          const delete_Image = product.product_Image.map((e) => {
            const part = e.split("/");
            return part[4]; // Extract filename
          });

          // Wait for all deletions before sending a response
          await Promise.all(
            delete_Image.map((element) =>
              fs.unlink(`src/product_image/${element}`, (err) => {
                if (err) console.error(`Failed to delete: ${element}`, err);
              })
            )
          );

          return res.send({
            mess: "success",
            status: 200,
            text: "Update Successful",
          });
        } else {
          return res.send({
            mess: "error",
            status: 400,
            text: "Please Send Correct Id",
          });
        }
      } else {
        const product = await Product.findOneAndUpdate(
          { _id: id },
          {
            product_Title: product_Title,
            product_Description: product_Description,
            product_Category: product_Category,
            product_Sub_Category: product_Sub_Category,
            product_SKU: product_SKU,
            product_Weight_units: product_Weight_units,
            product_color: product_color,
            product_rating: product_rating,
            product_Selling_Price: product_Selling_Price,
            product_Main_Price: product_Main_Price,
            product_Stock: product_Stock,
            product_Quantity: product_Quantity,
            product_Quantity_unit: product_Quantity_unit,
            product_variant: product_variant,
            product_hit: product_hit,
            product_Offer_Percentage: product_Offer_Percentage,
            product_Brand: product_Brand,
            product_Warranty_Information: product_Warranty_Information,
            product_Shipping_Information: product_Shipping_Information,
            product_Weight: product_Weight,
            product_SEO_Title: product_SEO_Title,
            product_SEO_Description: product_SEO_Description,
            product_SEO_Keywords: product_SEO_Keywords,
          }
        );
        if (product) {
          res.send({
            mess: "success",
            status: 200,
            text: "Update Successfull",
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

route.post("/product_delete_tempo", async (req, res) => {
  const { id, product_Delete } = req.body;

  try {
    const product_Delete_tempo = await Product.findOneAndUpdate(
      { _id: id },
      { product_Delete: product_Delete }
    );
    if (product_Delete_tempo) {
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

route.post("/product_restore", async (req, res) => {
  const { id, product_Delete } = req.body;

  try {
    const product_Delete_tempo = await Product.findOneAndUpdate(
      { _id: id },
      { product_Delete: product_Delete }
    );
    if (product_Delete_tempo) {
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

route.post("/product_delete", async (req, res) => {
  const id = req.body.id;
  try {
    const product = await Product.findOneAndDelete({ _id: id });

    if (product) {
      const delete_Image = product.product_Image.map((e) => {
        const part = e.split("/");
        return part[4];
      });

      // Wait for all deletions before sending a response
      await Promise.all(
        delete_Image.map((element) =>
          fs.promises.unlink(`src/product_image/${element}`).catch((err) => {
            console.error(`Failed to delete: ${element}`, err);
          })
        )
      );

      res.send({
        mess: "success",
        status: 200,
        text: "Permanent Delete Successful",
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Send Correct Id" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

module.exports = route;
