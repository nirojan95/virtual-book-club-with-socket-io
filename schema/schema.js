const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;
const _ = require("lodash");
// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;
// const sha1 = require("sha1");

// let dbo = undefined;
// let url =
//   "mongodb+srv://chuckedup:JAbSNA29hPYv8na@cluster0-jxjpp.mongodb.net/test?retryWrites=true&w=majority";
// MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
//   dbo = db.db("LearnFrench");
// });

let users = [
  { username: "Bob", password: "123456", id: "1" },
  { username: "Sue", password: "123456", id: "2" }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        /*code to get data from db*/

        return _.find(users, { id: args.id });
      }
    }
  })
});

module.exports = new GraphQLSchema({ query: RootQuery });
