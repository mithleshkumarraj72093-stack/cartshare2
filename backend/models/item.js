const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, index: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, default: 1 },
  addedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Item", itemSchema);