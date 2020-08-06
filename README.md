# fpl-api-graphql

## DEPRECATED

Package no longer actively maintained.

## Installation

```bash
npm install fpl-api-graphql --save
```

## Usage

```js
const { typeDefs, resolvers } = require('fpl-api-graphql');
```

The package exposes GraphQL `typeDefs` (a schema description as a GraphQL type language string) and `resolvers`.

There are no assumptions about the implementation. If serving over http the package would typically be consumed with either [express-graphql](https://github.com/graphql/express-graphql) or [apollo-server](https://github.com/apollographql/apollo-server).

## Example

This example uses [express-graphql](https://github.com/graphql/express-graphql) to serve over http and [graphql-tools](https://github.com/apollographql/graphql-tools) to build an executable schema.

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('fpl-api-graphql');

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

The GraphQL server will be available at http://localhost:3000/graphql and the [GraphiQL](https://github.com/graphql/graphiql) IDE will also be available in the browser.

## TODO

- More documentation
- Unit tests
