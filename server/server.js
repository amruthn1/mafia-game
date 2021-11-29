const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require('fs')
const httpServer = createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(res)
});
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket) => {
    socket.on("message", (data) => {
        if (data[0] === "createLobby") {
            var rid = (Math.random() + 1).toString(36).substring(2)
            io.to(data[1]).emit(rid)
        } else if (data[0] === "inLobby") {
            socket.join(data[1])
            io.in(data[1]).emit(["6" + "//" + data[2], socket.id]);
        } else if (data[0] === "updateLobby") {
            socket.join(data[2])
            socket.to(data[2]).emit(["updatedLobby", data[1], data[3]])
        } else if (data[0] === "movetoGame") {
            socket.join(data[2])
            socket.to(data[2]).emit(['movetoGame'])
        } else if (data[0] === "endLobby") {
            socket.join(data[1])
            io.in(data[1]).emit(["leaveRoom"])
        }
    })
    socket.on('disconnect', () => {
        io.emit(['disconnected', socket.id])
        
    })
});

httpServer.listen(process.env.PORT || 8000);