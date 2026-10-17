const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.get("/:roomCode", async (req, res) => {
  try {
    const items = await Item.find({ roomCode: req.params.roomCode.toUpperCase() });
    res.status(200).json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;