import axios from 'axios';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as humps from 'humps';
import { compileFromFile } from 'json-schema-to-typescript';
import { schemify } from 'json-schemify';
import * as jsosnfile from 'jsonfile';

axios.defaults.baseURL = 'https://fantasy.premierleague.com/api';

Promise.all([
  axios.get('/bootstrap-static/'),
  axios.get('/entry/3514308/'),
  axios.get('/entry/3514308/history/'),
  axios.get(`/entry/3514308/event/1/picks/`),
  axios.get('/element-summary/1/'),
  axios.get('/event/1/live/'),
]).then(
  async ([
    bootstrapstatic,
    entry,
    entryHistory,
    entryPicks,
    elementSummary,
    eventLive,
  ]) => {
    write('bootstrap-static', bootstrapstatic.data);
    write('entry', entry.data);
    write('entry-history', entryHistory.data);
    write('entry-picks', entryPicks.data);
    write('element-summary', elementSummary.data);
    write('event-live', eventLive.data);
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
  console.log(
    chalk.green(`[task:prepbuild] writing json schema ${schemaPath}`),
  );

  const interfacesPath = `./src/interfaces/${name}.interface.ts`;
  const interfaces = await compileFromFile(
    `${buildRoot}/json-schemas/${name}.schema.json`,
  );
  fs.writeFileSync(interfacesPath, interfaces);
  console.log(
    chalk.green(`[task:prepbuild] writing interface ${interfacesPath}`),
  );
}
