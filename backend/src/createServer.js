// GRAPHQL YOGA - uses express
const { GraphQLServer } = require("graphql-yoga");

// Grab the resolvers
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");

// Import the Database
const db = require("./db");

// Create the GRAPHQL Yoga Server
function createServer(){
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db})
  })
}

module.exports = createServer;