const { io } = require("socket.io-client");
const socket = io("http://localhost:3000/");
socket.on("connect", () => {
    console.log(socket.connected); // true
    // socket.emit("session_request", {
    //     "session_id": "minhtri"
    // })
    // console.log(socket.id)
    // socket.emit("user_uttered", {
    //     "session_id": "minhtri",
    //     "message": "i'm sad",
    // });
    // socket.join(socket.id)
    socket.on("bot_uttered", (...args) => {
        console.log(args[0].text)
    });
});

// socket.onAny((eventName, ...args) => {
//     console.log(eventName);
// });

socket.on("disconnect", () => {
    console.log(socket.connected); // false
});