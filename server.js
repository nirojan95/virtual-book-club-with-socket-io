const app = require("express")();
const server = require("http").Server(app);
const graphQLHTTP = require("express-graphql");
const io = require("socket.io")(server);
const next = require("next");

const schema = require("./schema/schema");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

app.use("/graphql", graphQLHTTP({ schema, graphiql: true }));

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
