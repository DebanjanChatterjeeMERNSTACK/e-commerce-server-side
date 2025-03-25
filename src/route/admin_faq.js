const express = require("express");
const route = express.Router();
const Faq = require("../model/faq");

route.post("/add_faq", async (req, res) => {
  const { login_id, Question, Answer } = req.body;
  try {
    if (login_id) {
      const faq = await Faq({
        login_id: login_id,
        Question: Question,
        Answer: Answer,
      });
      faq.save().then(() => {
        res.send({
          mess: "success",
          status: 200,
          text: "FAQ Save Successfull",
        });
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (error) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});



route.post("/faq_update", async (req, res) => {
  const { id, Question, Answer } = req.body;
  try {
    const faq = await Faq.findOneAndUpdate(
      { _id: id },
      { Question: Question, Answer: Answer }
    );
    if (faq) {
      res.send({
        mess: "success",
        status: 200,
        text: "FAQ Update Successfull",
      });
    } else {
      res.send({
        mess: "error",
        status: 400,
        text: "Please Send Correct Id",
      });
    }
  } catch (error) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});


//middleware
route.get("/faq_get", async (req, res) => {
  const login_id = req.headers["login_id"];
  try {
    if (login_id != "undefined" || login_id !== "" || !login_id) {
      const faqdata = await Faq.find({ login_id: login_id })
        .sort({
          _id: -1,
        })
        .select("-login_id");
      res.send({
        mess: "success",
        status: 200,
        text: "Send Success",
        faq: faqdata,
      });
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
});

module.exports = route;
