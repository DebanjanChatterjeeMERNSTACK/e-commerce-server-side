const express = require("express");
const route = express.Router();
const member = require("../model/memberSchema");
const middleware = require("../middleware/middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: "src/member_image",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

route.post("/add_member", upload.single("member_Image"), async (req, res) => {
  const { login_id, member_Fullname, member_Position } = req.body;

  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      if (req.file) {
        const member_Image = `${process.env.URL}/member/${req.file.filename}`;
        const members = await member({
          login_id: login_id,
          member_Fullname: member_Fullname,
          member_Position: member_Position,
          member_Image: member_Image,
        });
        members.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "Member Save Successfull",
          });
        });
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Member Image Please Upload",
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
route.get("/get_member", async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const members = await member
        .find({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");
      if (members.length > 0) {
        res.send({
          mess: "success",
          status: 200,
          text: "Send Success",
          memberdata: members,
        });
      } else {
        res.send({ mess: "error", status: 400, text: "Member Not Found" });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

// route.get("/member_edit/:id", async (req, res) => {
//   const id = req.params["id"];
//   try {
//     const member = await member.findOne({ _id: id }).select('-login_id');
//     if (member) {
//       res.send({
//         mess: "success",
//         status: 200,
//         text: "Send Success",
//         member: member,
//       });
//     } else {
//       res.send({ mess: "error", status: 400, text: "Please Login" });
//     }
//   } catch (err) {
//     res.send({ mess: "error", status: 400, text: err.message });
//   }
// });

route.post(
  "/member_update",
  upload.single("member_Image"),
  async (req, res) => {
    const { id, member_Fullname, member_Position } = req.body;
    try {
      if (req.file) {
        const member_Image = `${process.env.URL}/member/${req.file.filename}`;
        const members = await member.findOneAndUpdate(
          { _id: id },
          {
            member_Fullname: member_Fullname,
            member_Position: member_Position,
            member_Image: member_Image,
          }
        );
        if (members) {
          const delete_Image = members.member_Image.split("/");
          fs.unlink(`src/member_image/${delete_Image[4]}`, (err) => {
            if (err) {
              throw err;
            } else {
              res.send({
                mess: "success",
                status: 200,
                text: "Update complete",
              });
            }
          });
        } else {
          res.send({ mess: "error", status: 400, text: "Please Correct Id" });
        }
      } else {
        const members = await member.findOneAndUpdate(
          { _id: id },
          {
            member_Fullname: member_Fullname,
            member_Position: member_Position,
          }
        );
        if (members) {
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

route.post("/member_delete", async (req, res) => {
  const id = req.body.id;
  try {
    const members = await member.findOneAndDelete({ _id: id }, { _id: id });
    if (members) {
      const delete_Image = members.member_Image.split("/");
      fs.unlink(`src/member_image/${delete_Image[4]}`, (err) => {
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
