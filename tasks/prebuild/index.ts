import axios from 'axios';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as humps from 'humps';
import { compileFromFile } from 'json-schema-to-typescript';
import { schemify } from 'json-schemify';
import * as jsosnfile from 'jsonfile';

axios.defaults.baseURL = 'https://fantasy.premierleague.com/drf';

Promise.all([
  axios.get('/bootstrap-static'),
  axios.get('/entry/2762616/history'),
  axios.get('/entry/2762616/event/1/picks'),
  axios.get('/entry/2762616/transfers'),
  axios.get('/event/1/live'),
  axios.get('/leagues-classic-standings/313'),
  axios.get('/element-summary/1'),
]).then(
  async ([
    bootstrapstatic,
    entry,
    entryPicks,
    entryTransfers,
    eventLive,
    leaguesClassicStandings,
    elementSummary,
  ]) => {
    write('bootstrap-static', bootstrapstatic.data);
    write('entry', entry.data);
    write('entry-picks', entryPicks.data);
    write('entry-transfers', entryTransfers.data);
    write('event-live', eventLive.data);
    write('leagues-classic-standings', leaguesClassicStandings.data);
    write('element-summary', elementSummary.data);
  },
);

const buildRoot = './build';
const fixturesDir = `${buildRoot}/fixtures`;
const schemaDir = `${buildRoot}/json-schemas`;

async function write(name, data) {
  if (!fs.existsSync(buildRoot)) {
    fs.mkdirSync(buildRoot);
  }

  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir);
  }

  if (!fs.existsSync(schemaDir)) {
    fs.mkdirSync(schemaDir);
  }
  const fixturePath = `${fixturesDir}/${name}.data.json`;
  jsosnfile.writeFileSync(fixturePath, humps.camelizeKeys(data));
  console.log(chalk.green(`[task:prepbuild] writing fixture ${fixturePath}`));

  const schemaPath = `${schemaDir}/${name}.schema.json`;
  const schema = schemify(humps.camelizeKeys(data));
  jsosnfile.writeFileSync(schemaPath, schema, {
    spaces: 2,
  });
  console.log(chalk.green(`[task:prepbuild] writing json schema ${schemaPath}`));

  const interfacesPath = `./src/interfaces/${name}.interface.ts`;
  const interfaces = await compileFromFile(
    `${buildRoot}/json-schemas/${name}.schema.json`,
  );
  fs.writeFileSync(interfacesPath, interfaces);
  console.log(chalk.green(`[task:prepbuild] writing interface ${interfacesPath}`));
}
