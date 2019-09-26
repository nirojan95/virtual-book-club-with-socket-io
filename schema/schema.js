const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require("lodash");
const User = require("../models/user.js");

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
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }, username: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(args.username);
        return User.findOne({ username: args.username });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          password: args.password
        });
        return user.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
