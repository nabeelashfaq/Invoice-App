const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Define your type definitions (schema) and resolvers
const typeDefs = gql`
  type Query {
    hello: String
    sampleData: [SampleData]
  }

  type SampleData {
    id: ID
    name: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    sampleData: () => [
      { id: "1", name: "Sample 1" },
      { id: "2", name: "Sample 2" },
    ],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.start().then((res) => {
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () =>
    console.log("Server running at http://localhost:4000/graphql")
  );
});
