const express = require("express");
const route = express.Router();
const Blog = require("../model/blogSchema");
const middleware = require("../middleware/middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: "src/blog_image",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

route.post("/add_blog", upload.single("blog_Image"), async (req, res) => {
  const { login_id, blog_Title, blog_Description } =
    req.body;

  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      if (req.file) {
        const blog_Image = `${process.env.URL}/blog/${req.file.filename}`;
        const blog = await Blog({
          login_id: login_id,
          blog_Title: blog_Title,
          blog_Description: blog_Description,
          blog_Image: blog_Image,
        });
        blog.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "Blog Save Successfull",
          });
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Blog Image Please Upload",
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
route.get("/get_blog", async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const blog = await Blog.find({ login_id: login_id }).sort({
        _id: -1,
      }).select('-login_id');
      if (blog.length>0) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          blogdata: blog,
        });
      } else {
        res.send({ mess: "error", status: 400, text: "Blog Not Found" });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});



// route.get("/blog_edit/:id", async (req, res) => {
//   const id = req.params["id"];
//   try {
//     const blog = await blog.findOne({ _id: id }).select('-login_id');
//     if (blog) {
//       res.send({
//         mess: "success",
//         status: 200,
//         text: "Send Success",
//         blog: blog,
//       });
//     } else {
//       res.send({ mess: "error", status: 400, text: "Please Login" });
//     }
//   } catch (err) {
//     res.send({ mess: "error", status: 400, text: err.message });
//   }
// });



route.post(
  "/blog_update",
  upload.single("blog_Image"),
  async (req, res) => {
    const { id, blog_Title, blog_Description } = req.body;
    try {
      if (req.file) {
        const blog_Image = `${process.env.URL}/blog/${req.file.filename}`;
        const blog = await Blog.findOneAndUpdate(
          { _id: id },
          {
            blog_Image: blog_Image,
            blog_Title: blog_Title,
            blog_Description: blog_Description,
           
          }
        );
        if (blog) {
          const delete_Image = blog.blog_Image.split("/");
          fs.unlink(`src/blog_image/${delete_Image[4]}`, (err) => {
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
        const blog = await Blog.findOneAndUpdate(
          { _id: id },
          {
            blog_Title: blog_Title,
            blog_Description: blog_Description,
          }
        );
        if (blog) {
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



route.post("/blog_delete", async (req, res) => {
  const id = req.body.id;
  try {
    const blog = await Blog.findOneAndDelete({ _id: id }, { _id: id });
    if (blog) {
      const delete_Image = blog.blog_Image.split("/");
      fs.unlink(`src/blog_image/${delete_Image[4]}`, (err) => {
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
