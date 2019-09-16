const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

io.on("connection", socket => {
  console.log("a user connected");
  // socket.on("chat message", msg => {
  //   io.emit("chat message", msg);
  // });
  socket.emit("now", { message: "zeit" });
});

app.get("*", (req, res) => {
  return nextHandler(req, res);
});

server.listen(port, () => {
  console.log("listening on *:3000");
});
