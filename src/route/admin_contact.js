const express = require("express");
const route = express.Router();
const Contact = require("../model/contactSchema");
const middleware = require("../middleware/middleware");

route.post("/contact_save", async (req, res) => {
  const { login_id, Address1,Address2, Phone_number1,Phone_number2,Email_id1,Email_id2 ,Map} = req.body;
  try {
    if (login_id) {
      const data = await Contact.find({ login_id: login_id }).countDocuments();
      if (data == 1) {
        res.send({
          mess: "error",
          status: 400,
          text: "You Have Already Submit Your Contact ",
        });
      } else {
        const contact = await Contact({
          login_id: login_id,
          Address1: Address1,
          Address2:Address2,
          Phone_number1: Phone_number1,
          Phone_number2:Phone_number2,
          Email_id1: Email_id1,
          Email_id2:Email_id2,
          Map:Map
        });
        contact.save().then(() => {
          res.send({
            mess: "success",
            status: 200,
            text: "Contact Save Successfull",
          });
        });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

//middleware

route.get("/contact_get", async (req, res) => {
  const login_id = req.headers["login_id"];

  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const contact = await Contact.find({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        contact: contact,
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

// route.get("/contact_edit/:id", async (req, res) => {
//   const id = req.params["id"];
//   try {
//     const contact = await Contact.findOne({ _id: id }).select("-login_id");
//     if (contact) {
//       res.send({
//         mess: "success",
//         status: 200,
//         text: "Send Success",
//         contact: contact,
//       });
//     } else {
//       res.send({
//         mess: "error",
//         status: 400,
//         text: "Please Send Correct Id",
//       });
//     }
//   } catch (err) {
//     res.send({ mess: "error", status: 400, text: err.message });
//   }
// });

route.post("/contact_update", async (req, res) => {
  const { id, Address1,Address2, Phone_number1,Phone_number2,Email_id1,Email_id2 ,Map} = req.body;

  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id },
     { 
      Address1: Address1,
      Address2:Address2,
      Phone_number1: Phone_number1,
      Phone_number2:Phone_number2,
      Email_id1: Email_id1,
      Email_id2:Email_id2,
      Map:Map
     }
    );
    if (contact) {
      res.send({
        mess: "success",
        status: 200,
        text: "Contact Update Successfull",
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


// route.post("/contactdelete", async (req, res) => {

//     const id = req.body
//     const contact = await Contact.findOneAndDelete({ id: _id.toString() }, { id: _id.toString() })
//     res.semd({ mess: "Delete Complete" })

// })

module.exports = route;
