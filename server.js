const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

// const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;

const graphQLHTTP = require("express-graphql");
const schema = require("./schema/schema");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const mongoose = require("mongoose");
let url = require("./config.js");
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser());

// let dbo = undefined;
// MongoClient.connect(
//   url,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, db) => {
//     if (err) {
//       console.log("Error connecting to MongoDB", err);
//       return;
//     }
//     dbo = db.db("virtual-book-club");
//     console.log("connected");
//   }
// );

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
});

app.use("/graphql", graphQLHTTP({ schema, graphiql: true }));

io.on("connection", socket => {
  console.log("a user connected");
  // socket.on("chat message", msg => {
  //   io.emit("chat message", msg);
  // });
  socket.emit("now", { message: "zeit" });
});

app.post("/signupEndpoint", (req, res) => {
  console.log(req.body);
  let body = req.body;
  let username = body.username;
  let password = body.password;
  dbo.collection("users").findOne({ users: username }, async (err, user) => {
    if (err) {
      console.log("Error at signup", err);
      res.send(JSON.stringify({ success: false, msg: "error at signup" }));
      return;
    }
    if (user !== null) {
      console.log("This username is taken");
      res.send(JSON.stringify({ success: false, msg: "username taken" }));
      return;
    }
    if (user === null) {
      let sessionId = generateId();
      await dbo.collection("users").insertOne(
        {
          username: username,
          password: password
        },
        err => {
          if (err) {
            console.log("ERROR", err);
          }
        }
      );
      await dbo
        .collection("sessions")
        .insertOne({ username: username, sessionId: sessionId });
      res.cookie("sid", sessionId);
      dbo
        .collection("users")
        .findOne({ username: username }, (err, profile) => {
          if (err) {
            console.log("ERROR", err);
            return;
          }
          console.log("sending success message", profile);
          res.send(
            JSON.stringify({
              success: true,
              profileData: profile,
              msg: "Signup successful!"
            })
          );
          return;
        });
    }
  });
});

let generateId = () => {
  return "" + Math.floor(Math.random() * 1000000000);
};

let port = 3000;

server.listen(port, () => {
  console.log("listening on *:3000");
});
