const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('./dist');
const cors = require('cors');

// build schema from typedefs and resolvers
const schema = makeExecutableSchema({ typeDefs, resolvers });

// express app
const app = express();

// cors
app.use(cors());

// graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

// serve
app.listen(4000, () => {
  console.log(`express-graphql demo running on port 4000`);
});
