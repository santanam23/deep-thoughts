const express = require('express');

// import AplloServer
const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers 
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

// create Apollo server
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {authMiddleware}
  });
  // Start the apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we acn go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

};
// Initialize the Apollo Server
startServer();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
