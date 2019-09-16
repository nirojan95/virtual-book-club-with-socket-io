let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
