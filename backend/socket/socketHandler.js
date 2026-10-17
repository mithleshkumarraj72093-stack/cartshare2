const Item = require("../models/item");
const Room = require("../models/room");

function setupSocket(io) {
  io.on("connection", (socket) => {
    
    socket.on("join-room", async (roomCode) => {
      try {
        socket.join(roomCode);
        
        const items = await Item.find({ roomCode: roomCode });
        socket.emit("items-loaded", items);

        const room = await Room.findOne({ roomCode: roomCode });
        socket.emit("room-loaded", room);
      } catch (err) {
        socket.emit("error", err.message);
      }
    });

    socket.on("add-item", async (data) => {
      try {
        const { roomCode, name, price, qty, addedBy } = data;
        
        const item = new Item({ roomCode, name, price, qty, addedBy });
        await item.save();

        io.to(roomCode).emit("item-added", item);
      } catch (err) {
        socket.emit("error", err.message);
      }
    });

    socket.on("remove-item", async (data) => {
      try {
        const { roomCode, itemId } = data;
        
        await Item.findByIdAndDelete(itemId);
        io.to(roomCode).emit("item-removed", itemId);
      } catch (err) {
        socket.emit("error", err.message);
      }
    });

    socket.on("disconnect", () => {
    });
  });
}

module.exports = setupSocket;