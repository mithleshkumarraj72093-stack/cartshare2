// //  CartShare - Room Logic , Create / Join / Leave room

// const FREE_DELIVERY_THRESHOLD = 500;

// function createRoom() {
//   const session = getSession();
//   if (!session || !session.userName) {
//     alert("Please enter your name first.");
//     return;
//   }

//   const code = generateRoomCode();
//   const room = {
//     roomCode: code,
//     createdBy: session.userName,
//     createdAt: Date.now(),
//     members: [session.userName],
//     items: [],
//     activityLog: [
//       {
//         user: session.userName,
//         action: "created the room",
//         time: Date.now(),
//       },
//     ],
//   };

//   saveRoom(room);

//   // Update session with room code
//   session.roomCode = code;
//   saveSession(session);

//   // Redirect to cart page
//   window.location.href = "cart.html";
// }

// function joinRoom() {
//   const session = getSession();
//   if (!session || !session.userName) {
//     alert("Please enter your name first.");
//     return;
//   }

//   const input = document.getElementById("roomCodeInput");
//   const code = input.value.trim().toUpperCase();
//   const errorEl = document.getElementById("roomError");

//   if (code.length !== 6) {
//     errorEl.textContent = "Room code must be 6 characters.";
//     return;
//   }

//   const room = loadRoom(code);
//   if (!room) {
//     errorEl.textContent = "Room not found. Check the code.";
//     return;
//   }

//   // Add member if not already present
//   if (!room.members.includes(session.userName)) {
//     room.members.push(session.userName);
//     room.activityLog.push({
//       user: session.userName,
//       action: "joined the room",
//       time: Date.now(),
//     });
//     saveRoom(room);
//   }

//   // Update session
//   session.roomCode = code;
//   saveSession(session);

//   window.location.href = "cart.html";
// }

// function leaveRoom() {
//   if (!confirm("Are you sure you want to leave this room?")) return;

//   const session = getSession();
//   if (!session) {
//     window.location.href = "index.html";
//     return;
//   }

//   if (session.roomCode) {
//     const room = loadRoom(session.roomCode);
//     if (room) {
//       // Remove member from room
//       room.members = room.members.filter((m) => m !== session.userName);

//       // Add activity log
//       room.activityLog.push({
//         user: session.userName,
//         action: "left the room",
//         time: Date.now(),
//       });

//       saveRoom(room);
//     }
//   }

//   // Clear room from session but keep user name
//   session.roomCode = null;
//   saveSession(session);

//   // Redirect to home
//   window.location.href = "index.html";
// }

const FREE_DELIVERY_THRESHOLD = 500;

async function createRoom() {
  const session = getSession();
  if (!session || !session.userName) {
    alert("Please enter your name first.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/rooms/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: session.userName }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to create room");

    session.roomCode = data.room.roomCode;
    saveSession(session);
    window.location.href = "cart.html";
  } catch (err) {
    console.error(err);
    alert("Error creating room: " + err.message);
  }
}

async function joinRoom() {
  const session = getSession();
  if (!session || !session.userName) {
    alert("Please enter your name first.");
    return;
  }

  const input = document.getElementById("roomCodeInput");
  const code = input.value.trim().toUpperCase();
  const errorEl = document.getElementById("roomError");

  if (code.length !== 6) {
    errorEl.textContent = "Room code must be 6 characters.";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/rooms/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomCode: code, userName: session.userName }),
    });

    const data = await res.json();
    if (!data.success) {
      errorEl.textContent = data.error;
      return;
    }

    session.roomCode = code;
    saveSession(session);
    window.location.href = "cart.html";
  } catch (err) {
    console.error(err);
    errorEl.textContent = "Error joining room. Check console.";
  }
}

async function leaveRoom() {
  if (!confirm("Are you sure you want to leave this room?")) return;

  const session = getSession();
  if (!session) {
    window.location.href = "index.html";
    return;
  }

  if (session.roomCode) {
    try {
      // Backend mein leave ka koi route nahi banaya, toh hum frontend se hi session clear kar rahe hain
      session.roomCode = null;
      saveSession(session);
    } catch (err) {
      console.error(err);
    }
  }

  window.location.href = "index.html";
}