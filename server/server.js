const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("message", (data) => {
        console.log("message recieved")
        console.log(data)
        if (data[0] === "createLobby") {
            var rid = (Math.random() + 1).toString(36).substring(2)
            io.to(data[1]).emit(rid)
            console.log("emitting new lobby id")
        } else if (data[0] === "inLobby") {
            console.log("emitting new player")
            socket.join(data[1])
            io.in(data[1]).emit(["6" + "//" + data[2], ""]);
        } else if (data[0] === "updateLobby") {
            socket.join(data[2])
            socket.to(data[2]).emit(["updatedLobby", data[1]])
        } else if (data[0] === "disconnect") {
            console.log("disconnected")
            socket.join(data[2])
            socket.to(data[2]).emit(["disconnected", data[1]])
        } else if (data[0] === "movetoGame") {
            socket.join(data[2])
            socket.to(data[2]).emit(['movetoGame'])
        }
    })
});

httpServer.listen(8000);