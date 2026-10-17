// /* ================================
//    CartShare - Storage Helpers
//    Handles all localStorage operations
//    ================================ */

// const STORAGE_PREFIX = "cartshare_";
// const SESSION_KEY = STORAGE_PREFIX + "session";

// /* ---------- Session (current user + room) ---------- */

// function saveSession(session) {
//   localStorage.setItem(SESSION_KEY, JSON.stringify(session));
// }

// function getSession() {
//   const raw = localStorage.getItem(SESSION_KEY);
//   return raw ? JSON.parse(raw) : null;
// }

// function clearSession() {
//   localStorage.removeItem(SESSION_KEY);
// }

// /* ---------- Room Data ---------- */

// function roomKey(code) {
//   return STORAGE_PREFIX + "room_" + code;
// }

// function saveRoom(room) {
//   localStorage.setItem(roomKey(room.roomCode), JSON.stringify(room));
// }

// function loadRoom(code) {
//   const raw = localStorage.getItem(roomKey(code));
//   return raw ? JSON.parse(raw) : null;
// }

// function deleteRoom(code) {
//   localStorage.removeItem(roomKey(code));
// }

// /* ---------- Helpers ---------- */

// function generateRoomCode() {
//   const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // confusing chars hata diye
//   let code = "";
//   for (let i = 0; i < 6; i++) {
//     code += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   // Ensure unique
//   if (loadRoom(code)) return generateRoomCode();
//   return code;
// }

// function formatCurrency(amount) {
//   return "₹" + Number(amount).toLocaleString("en-IN");
// }

// function formatTime(timestamp) {
//   const d = new Date(timestamp);
//   return d.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }


const API_URL = "http://localhost:4000";
const SOCKET_URL = "http://localhost:4000";

const SESSION_KEY = "cartshare_session";

function saveSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function formatCurrency(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function formatTime(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}