import chalk from 'chalk';
import * as fs from 'fs-extra';
import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, printSchema } from 'graphql';
import { schemify } from 'json-schemify';
import * as jsonfile from 'jsonfile';
import * as path from 'path';

import { parse } from './types/any';

const fixturesRoot = './build/fixtures';

Promise.all([
  jsonfile.readFileSync(`${fixturesRoot}/bootstrap-static.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry-history.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry-picks.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/event-live.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/element-summary.data.json`),
]).then(([bootstrapstatic, entry, entryHistory, entryPicks, eventLive]) => {
  const entrySchema = {
    ...entry,
    history: {
      ...entryHistory,
      current: entryHistory.current.map(current => {
        return {
          ...current,
          picks: entryPicks.picks.map(pick => {
            return {
              ...pick,
              elementType: 1,
              stats: eventLive.elements[0].stats,
            };
          }),
        };
      }),
    },
  };
  const eventsSchema = bootstrapstatic.events.map(event => {
    return {
      ...event,
      elements: eventLive.elements,
    };
  });
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        // bootstrap: { type: buildSchema(bootstrapstatic, 'Bootstrap') },
        totalPlayers: { type: GraphQLFloat },
        elements: { type: buildSchema(bootstrapstatic.elements, 'Element') },
        events: { type: buildSchema(eventsSchema, 'Event') },
        entry: {
          type: buildSchema(entrySchema, 'Entry'),
          args: {
            id: { type: GraphQLInt },
          },
        },
      },
    }),
  });

  const file = path.join(__dirname, '../../src/', `schema.ts`);

  fs.outputFileSync(
    file,
    'export const typeDefs = `\n' + printSchema(schema) + '`;\n',
  );

  console.log(chalk.green(`[task:build] writing graphql typedefs ${file}`));
});

function buildSchema(response: any, name: string) {
  const jsonSchema = schemify(response);
  return parse(name, jsonSchema);
}
