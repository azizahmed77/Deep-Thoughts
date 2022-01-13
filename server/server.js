const express = require('express');
//import ApolloServer
const { ApolloServer} = require('apollo-server-express')

//import our typeDefs and resolvers
const { typeDefs, resolvers} = require('./schemas')
const db = require('./config/connection');

const PORT = process.env.PORT || 4001;
const app = express();

const startServer = async () => {
  //create a new Apollo servee and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    /*context: ({ req }) => ({
      data: authMiddleware(req)
    })*/
  })

  // start the apollo server
  await server.start()
  //integrate our Apollo server with the express application as middleware
  server.applyMiddleware({ app })

  // log where we can go to test our GQL API
  console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`)
}

// initialize the apollo server
startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
