import chalk from 'chalk';
import * as fs from 'fs-extra';
import { GraphQLInt, GraphQLObjectType, GraphQLSchema, printSchema } from 'graphql';
import { schemify } from 'json-schemify';
import * as jsonfile from 'jsonfile';
import * as path from 'path';
import { EntryPicks } from '../../src/interfaces/entry-picks.interface';
import { EntryTransfers } from '../../src/interfaces/entry-transfers.interface';
import { Entry } from '../../src/interfaces/entry.interface';
import { EventLive } from '../../src/interfaces/event-live.interface';
import { parse } from './types/any';

const fixturesRoot = './build/fixtures';

Promise.all([
  jsonfile.readFileSync(`${fixturesRoot}/bootstrap-static.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry-picks.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/entry-transfers.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/event-live.data.json`),
  jsonfile.readFileSync(`${fixturesRoot}/leagues-classic-standings.data.json`),
]).then(([bootstrapstatic, entry, entryPicks, entryTransfers, eventLive, leagueClassic]) => {
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        currentEvent: {
          type: GraphQLInt,
        },
        totalPlayers: {
          type: GraphQLInt,
        },
        elements: {
          type: buildSchema(bootstrapstatic.elements, 'Elements'),
        },
        events: {
          type: buildSchema(bootstrapstatic.events, 'Events'),
        },
        teams: {
          type: buildSchema(bootstrapstatic.teams, 'Teams'),
        },
        elementTypes: {
          type: buildSchema(bootstrapstatic.elementTypes, 'ElementTypes'),
        },
        entry: {
          type: buildManagerSchema(entry, entryPicks, eventLive, entryTransfers, 'Entry'),
          args: {
            id: { type: GraphQLInt },
          },
        },
        leagueClassic: {
          type: buildSchema(leagueClassic, 'LeagueClassic'),
          args:{
            id: {type: GraphQLInt}
          }
        },
      },
    }),
  });

  const file = path.join(__dirname, '../../src/', `schema.ts`);

  fs.outputFileSync(file, 'export const typeDefs = `\n' + printSchema(schema) + '`;\n');
  console.log(chalk.green(`[task:build] writing graphql schema ${file}`));
});

function buildSchema(response: any, name: string) {
  const jsonSchema = schemify(response);
  // write(name, jsonSchema, response);
  return parse(name, jsonSchema);
}

function buildManagerSchema(
  entry: Entry,
  entryPicks: EntryPicks,
  eventLive: EventLive,
  entryTransfers: EntryTransfers,
  name: string,
) {
  const transfers = {
    history: entryTransfers.history,
    wildcards: entryTransfers.wildcards,
  };

  let history;
  let picks;
  if (entryPicks.picks) {
    if (eventLive && eventLive.elements) {
      const element1 = eventLive.elements['1'];
      picks = entryPicks.picks.map(pick => {
        return { ...pick, ...element1.stats };
      });
    }
    if (entry.history) {
      history = entry.history.map(item => {
        return { ...item, picks };
      });
    }
  }

  const parsedJson = {
    ...entry.entry,
    chips: entry.chips,
    leagues: entry.leagues,
    season: entry.season,
    history,
    transfers,
  };
  const jsonSchema = schemify(parsedJson);
  // write(name, jsonSchema, parsedJson);
  return parse(name, jsonSchema);
}

function write(name, jsonSchema, parsedJson) {
  jsonfile.writeFileSync(`./out/schema.${name.toLowerCase()}.json`, jsonSchema);
  jsonfile.writeFileSync(`./out/response.${name.toLowerCase()}.json`, parsedJson);
}
