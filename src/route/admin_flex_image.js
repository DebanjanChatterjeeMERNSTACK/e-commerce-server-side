const express = require("express");
const route = express.Router();
const middleware = require("../middleware/middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const Flex_image = require("../model/fleximageSchema");

const storage = multer.diskStorage({
  destination: "src/flex_image",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

route.post(
  "/add_fleximage",
  upload.fields([
    { name: "Flex_image_1", maxCount: 1 },
    { name: "Flex_image_2", maxCount: 1 },
    { name: "Flex_image_3", maxCount: 1 },
    { name: "Flex_image_4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { login_id } = req.body;
      const Flex_image_1 = req.files["Flex_image_1"][0].filename;
      const Flex_image_2 = req.files["Flex_image_2"][0].filename;
      const Flex_image_3 = req.files["Flex_image_3"][0].filename;
      const Flex_image_4 = req.files["Flex_image_4"][0].filename;

      if (login_id) {

        const Flexdata = await Flex_image.find({ login_id: login_id }).countDocuments();
        if (Flexdata === 1) {
          return res.send({
            mess: "error",
            status: 400,
            text: "You Have Already Submit Your All Flex Image ",
          });
        }




        const flex1 = `${process.env.URL}/flex/${Flex_image_1}`;
        const flex2 = `${process.env.URL}/flex/${Flex_image_2}`;
        const flex3 = `${process.env.URL}/flex/${Flex_image_3}`;
        const flex4 = `${process.env.URL}/flex/${Flex_image_4}`;

        const data = await Flex_image({
          login_id: login_id,
          Flex_image_1: flex1,
          Flex_image_2: flex2,
          Flex_image_3: flex3,
          Flex_image_4: flex4,
        });
        data.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "All Flex Image Save Successfull",
          });
        });
      } else {
        res.send({ mess: "error", status: 400, text: "Please Login" });
      }
    } catch (err) {
      res.send({ mess: "error", status: 400, text: err.message });
    }
  }
);

route.get("/get_flex_image", async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const data = await Flex_image.findOne({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");
      if (data) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          fleximage: data,
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Flex Image Not Found",
        });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});



route.post("/update_flex_image", upload.fields([
    { name: "Flex_image_1", maxCount: 1 },
    { name: "Flex_image_2", maxCount: 1 },
    { name: "Flex_image_3", maxCount: 1 },
    { name: "Flex_image_4", maxCount: 1 },
]), async (req, res) => {
    try {
        const { id } = req.body;
        
        // First get the existing document to delete old images
        const existingData = await Flex_image.findById(id);
        if (!existingData) {
            return res.send({
                mess: "error",
                status: 400,
                text: "Flex Image Not Found"
            });
        }

       
        const Flex_image_1 = req.files["Flex_image_1"][0].filename;
        const Flex_image_2 = req.files["Flex_image_2"][0].filename;
        const Flex_image_3 = req.files["Flex_image_3"][0].filename;
        const Flex_image_4 = req.files["Flex_image_4"][0].filename;

        const flex1 = `${process.env.URL}/flex/${Flex_image_1}`;
        const flex2 = `${process.env.URL}/flex/${Flex_image_2}`;
        const flex3 = `${process.env.URL}/flex/${Flex_image_3}`;
        const flex4 = `${process.env.URL}/flex/${Flex_image_4}`;

        // Update with new images
        const data = await Flex_image.findOneAndUpdate(
            { _id: id },
            {
                Flex_image_1: flex1,
                Flex_image_2: flex2,
                Flex_image_3: flex3,
                Flex_image_4: flex4,
            }
        );
   if(data){

  const delete_Image1 = data.Flex_image_1.split("/");
      fs.unlink(`src/flex_image/${delete_Image1[4]}`, (err) => {
        if (err) console.error("Error deleting image 1:", err);
    });

      const delete_Image2 = data.Flex_image_2.split("/");
      fs.unlink(`src/flex_image/${delete_Image2[4]}`, (err) => {
        if (err) console.error("Error deleting image 2:", err);
    });

      const delete_Image3 = data.Flex_image_3.split("/");
      fs.unlink(`src/flex_image/${delete_Image3[4]}`, (err) => {
        if (err) console.error("Error deleting image 3:", err);
    });

      const delete_Image4 = data.Flex_image_4.split("/");
      fs.unlink(`src/flex_image/${delete_Image4[4]}`, (err) => {
        if (err) console.error("Error deleting image 4:", err);
    });

    res.send({
        mess: "success",
        status: 200,
        text: "Images Updated Successfully",
    });
   }else{
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

module.exports=route
