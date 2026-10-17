const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const cors = require("cors");
require("dotenv").config();

const roomRoutes = require("./routes/room");
const itemRoutes = require("./routes/items");
const setupSocket = require("./socket/socketHandler");

const app = express();
const server = http.createServer(app);

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5500";

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get("/healthz", (req, res) => res.status(200).send("OK"));

app.use("/api/rooms", roomRoutes);
app.use("/api/items", itemRoutes);

setupSocket(io);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});