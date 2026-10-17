const express = require("express");
const router = express.Router();
const Room = require("../models/room");

router.post("/create", async (req, res) => {
  try {
    const { userName } = req.body;

    if (!userName) {
      return res.status(400).json({ success: false, error: "User name is required" });
    }

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const room = new Room({
      roomCode: code,
      createdBy: userName,
      members: [userName]
    });

    await room.save();
    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/join", async (req, res) => {
  try {
    const { roomCode, userName } = req.body;

    if (!roomCode || !userName) {
      return res.status(400).json({ success: false, error: "Room code and user name required" });
    }

    const room = await Room.findOne({ roomCode: roomCode.toUpperCase() });

    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }

    if (!room.members.includes(userName)) {
      room.members.push(userName);
      await room.save();
    }

    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/:code", async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code.toUpperCase() });
    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;