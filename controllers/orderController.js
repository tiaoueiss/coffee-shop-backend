const Order = require("../models/Order.js");

// CREATE
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.populate("products.product");

    
    order.totalAmount = order.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer").populate("products.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customer").populate("products.product");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
exports.updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ADD PRODUCT TO ORDER
exports.addProductToOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const existing = order.products.find(
      (item) => item.product.toString() === productId
    );

    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      order.products.push({ product: productId, quantity: quantity || 1 });
    }

    await order.populate("products.product");

    order.totalAmount = order.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.id }).populate("products.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
