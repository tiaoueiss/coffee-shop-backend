const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cutomer: { type:mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    product: {type:mongoose.Schema.Types.ObjectId, ref: 'Product' , quantity: { type: Number, default: 1 }}, 
    orderDate: { type:Date, default: Date.now },
    totaLAmount: { type: Number, required: true }, 
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending'}
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);

