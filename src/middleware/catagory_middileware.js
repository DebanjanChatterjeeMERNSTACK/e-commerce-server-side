const Catagorys = require("../model/categorySchema");

const Catagory_middleware = async (req, res, next) => {
  const product_Catagory_Name = req.body.product_Catagory_Name;
  const id = req.body.login_id;

  try {
    if (id == "undefined" || id === "" || !id) {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    } else if (id) {
      if (product_Catagory_Name) {
        const Product_Catagory_Name = await Catagorys.findOne({
          product_Catagory_Name: product_Catagory_Name,
        });
        if (Product_Catagory_Name) {
          res.send({
            mess: "error",
            status: 400,
            text: "Catagory Have Same Name, Delete Permanently",
          });
        } else {
          next();
        }
      } else {
        res.send({
          mess: "error",
          status: 400,
          text: "Please Send The Catagory Name",
        });
      }
    } else {
      res.send({ mess: "error", status: 400, text: "Please Login" });
    }
  } catch (err) {
    res.send({ mess: "error", status: 400, text: err.message });
  }
};

module.exports = Catagory_middleware;
