import chalk from 'chalk';
import * as fs from 'fs-extra';
import { GraphQLInt, GraphQLObjectType, GraphQLSchema, printSchema } from 'graphql';
import { schemify } from 'json-schemify';
import * as jsonfile from 'jsonfile';
import * as path from 'path';

import { parse } from './types/any';
import { parseObjectFields } from './types/object.fields';

const fixturesRoot = './build/fixtures';

Promise.all([
  jsonfile.readFileSync(`${fixturesRoot}/bootstrap-static.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry-history.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry-picks.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/event-live.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/element-summary.data.json`),
]).then(
  ([
    bootstrapstatic,
    entry,
    entryHistory,
    entryPicks,
    eventLive,
    elementSummary,
  ]) => {
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          static: {
            type: buildSchema(bootstrapstatic, 'Static'),
          },
          entry: {
            type: new GraphQLObjectType({
              name: 'Entry',
              fields: {
                ...parseObjectFields('Entry', schemify(entry)),
                history: {
                  type: new GraphQLObjectType({
                    name: 'EntryHistory',
                    fields: parseObjectFields(
                      'EntryHistory',
                      schemify(entryHistory),
                    ),
                  }),
                  args: {
                    event: { type: GraphQLInt },
                  },
                },
                picks: {
                  type: new GraphQLObjectType({
                    name: 'EntryPicks',
                    fields: parseObjectFields(
                      'EntryPicks',
                      schemify(entryPicks),
                    ),
                  }),
                  args: {
                    event: { type: GraphQLInt },
                  },
                },
              },
            }),
            args: {
              id: { type: GraphQLInt },
            },
          },
          eventElements: {
            type: buildSchema(eventLive.elements, 'EventElements'),
            args: {
              event: { type: GraphQLInt },
            },
          },
          elementSummary: {
            type: buildSchema(elementSummary, 'ElementSummary'),
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
  },
);

function buildSchema(response: any, name: string) {
  const jsonSchema = schemify(response);
  return parse(name, jsonSchema);
}
