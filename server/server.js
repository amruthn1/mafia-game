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
        if (data[0] === "createLobby") {
            var rid = (Math.random() + 1).toString(36).substring(2)
            io.to(data[1]).emit(rid)
        }
    })
});

httpServer.listen(8000);