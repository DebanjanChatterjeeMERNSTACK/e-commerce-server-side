const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_login_id: {
      type: String,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin_product", // Reference to Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CartSchema = new mongoose.model("user_cart", cartSchema);
module.exports = CartSchema;
