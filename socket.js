module.exports = function(server) {

    const Express = require("express")();
    const Http = require("http").Server(Express);
    const Socketio = require("socket.io")(Http);

    var position = {
        x: 200,
        y: 200
    };

    Http.listen(3000, () => {
        console.log("Listening at :3000...");
    });

    Socketio.on("connection", socket => {
        console.info('client connected [id=' + socket.id + ']');
        socket.emit("position", position);
        socket.on("move", data => {
            switch (data) {
                case "left":
                    position.x -= 5;
                    Socketio.emit("position", position);
                    break;
                case "right":
                    position.x += 5;
                    Socketio.emit("position", position);
                    break;
                case "up":
                    position.y -= 5;
                    Socketio.emit("position", position);
                    break;
                case "down":
                    position.y += 5;
                    Socketio.emit("position", position);
                    break;
            }
        });
        socket.on("disconnect", () => console.info('client disconnected [id=' + socket.id + ']'));
    });

}