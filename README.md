# fpl-api-graphql

A GraphQL node wrapper for the Fantasy Premier League (fantasy.premierleague.com) REST apis.

[![npm](https://img.shields.io/npm/v/fpl-api-graphql.svg)](https://www.npmjs.com/package/fpl-api-graphql)

## Installation

```bash
npm install fpl-api-graphql --save
```

## Usage

The package exposes GraphQL type definitions and resolvers.

```js
const { typeDefs, resolvers } = require('fpl-api-graphql');
```

There are no assumptions about how this should be consumed. If serving over http this would typically be with either [express-graphql](https://github.com/graphql/express-graphql) or [apollo-server](https://github.com/apollographql/apollo-server).

## Example / Demo

This example uses [express-graphql](https://github.com/graphql/express-graphql) to serve and [graphql-tools](https://github.com/apollographql/graphql-tools) to build an executable schema.

### Preview

To run this example locally, clone the repo and run the demo:

```bash
git clone https://github.com/tgreyuk/fpl-api-graphql

npm install

npm run demo
```


The GraphQL server will be available at http://localhost:3000/graphql and the [GraphiQL](https://github.com/graphql/graphiql) IDE will also be available in the browser.

### Code

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

## TODO

* More documentation
* Unit tests
