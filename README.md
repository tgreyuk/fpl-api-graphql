# fpl-graphql

A GraphQL node wrapper for the Fantasy Premier League (fantasy.premierleague.com) REST apis.

### Installation

```js
npm install fpl-graphql --save
```

### Usage

The package exposes GraphQL type definitions and resolvers.

```js
const { typeDefs, resolvers } = require('fpl-graphql');
```

There are no assumptions about how this should be consumed. If serving over http this would typically be with either [express-graphql](https://github.com/graphql/express-graphql) or [apollo-server](https://github.com/apollographql/apollo-server).

### Example

This example uses express-graphql to serve and graphql-tools to build an executable schema.

The GraphQL server will be available at ht&#8203;tp://localhost:3000/graphql.

[GraphiQL](https://github.com/graphql/graphiql) will be exposed at ht&#8203;tp://localhost:3000/graphiql where the api can be examined with this powerful GraphQL IDE.

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('fpl-graphql');

// build executable schema from typedefs and resolvers
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
```
