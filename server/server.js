// TODO: Implement the Apollo Server and apply it to the Express server as middleware.

const express = require('express');
// * importing  Apollo server
const { ApolloServer } = require('apollo-server-express');

// * import TypeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const app = express();

const startServer = async () => {
  // * create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  })
   // * start the Apollo Server
   await server.start();

   // * integrate our Apollo server with the express application as middleware
   server.applyMiddleware({ app });

   // * log where we can go to test our GQL API
   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});