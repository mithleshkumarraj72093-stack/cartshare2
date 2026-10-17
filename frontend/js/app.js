// /* ================================
//    CartShare - App Init & Routing
//    ================================ */

// /* ---------- Index Page Logic ---------- */

// function goToRoomStep() {
//   const nameEl = document.getElementById("userName");
//   const name = nameEl.value.trim();

//   if (!name) {
//     alert("Please enter your name.");
//     return;
//   }

//   saveSession({ userName: name, roomCode: null });

//   document.getElementById("step-name").classList.add("d-none");
//   document.getElementById("step-room").classList.remove("d-none");
//   document.getElementById("displayName").textContent = name;
// }

// /* ---------- Cart Page Logic ---------- */

// function initCartPage() {
//   const session = getSession();

//   // Auth check
//   if (!session || !session.userName || !session.roomCode) {
//     window.location.href = "index.html";
//     return;
//   }

//   const room = loadRoom(session.roomCode);
//   if (!room) {
//     alert("Room not found. Please rejoin.");
//     window.location.href = "index.html";
//     return;
//   }

//   // Navbar
//   document.getElementById("navRoomCode").textContent = room.roomCode;
//   document.getElementById("navUserName").textContent = session.userName;

//   // Copy room code to clipboard on click (optional UX)
//   document.getElementById("navRoomCode").style.cursor = "pointer";
//   document.getElementById("navRoomCode").title = "Click to copy";
//   document.getElementById("navRoomCode").onclick = () => {
//     navigator.clipboard.writeText(room.roomCode);
//     alert("Room code copied: " + room.roomCode);
//   };

//   // Initial render
//   renderAll();

//   // 🔥 REAL-TIME SYNC across tabs
//   window.addEventListener("storage", (e) => {
//     if (e.key && e.key.startsWith("cartshare_room_")) {
//       renderAll();
//     }
//   });

//   // Also re-render when tab becomes visible again
//   document.addEventListener("visibilitychange", () => {
//     if (!document.hidden) renderAll();
//   });
// }

// function renderAll() {
//   renderCart();
//   renderActivity();
// }

// /* ---------- Auto-init on page load ---------- */

// document.addEventListener("DOMContentLoaded", () => {
//   const path = window.location.pathname;

//   if (path.includes("cart.html")) {
//     initCartPage();
//   }
//   // index.html doesn't need auto-init
// });

function goToRoomStep() {
  const name = document.getElementById("userName").value.trim();

  if (name === "") {
    alert("Please enter your name");
    return;
  }

  saveSession({ userName: name, roomCode: null });

  document.getElementById("displayName").textContent = name;
  document.getElementById("step-name").classList.add("d-none");
  document.getElementById("step-room").classList.remove("d-none");
}

function initCartPage() {
  const session = getSession();

  if (!session || !session.userName || !session.roomCode) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("navRoomCode").textContent = session.roomCode;
  document.getElementById("navUserName").textContent = session.userName;

  document.getElementById("navRoomCode").style.cursor = "pointer";
  document.getElementById("navRoomCode").title = "Click to copy";
  document.getElementById("navRoomCode").onclick = () => {
    navigator.clipboard.writeText(session.roomCode);
    alert("Room code copied: " + session.roomCode);
  };

  // Socket connect karo (jo cart.js mein define hai)
  if (typeof initSocket === "function") {
    initSocket();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path.includes("cart.html")) {
    initCartPage();
  }
});