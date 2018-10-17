const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('./dist');

// build schema from typedefs and resolvers
const schema = makeExecutableSchema({ typeDefs, resolvers });

// express app
const app = express();

// graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

// serve
app.listen(3000, () => {
  console.log(`express-graphql demo running on port 3000`);
});
