import axios from 'axios';
import * as DataLoader from 'dataloader';

import { BootstrapStatic } from '../interfaces/bootstrap-static.interface';
import { ElementSummary } from '../interfaces/element-summary.interface';
import { EntryHistory } from '../interfaces/entry-history.interface';
import { EntryPicks } from '../interfaces/entry-picks.interface';
import { EntryTransfers } from '../interfaces/entry-transfers.interface';
import { Entry } from '../interfaces/entry.interface';
import { EventLive } from '../interfaces/event-live.interface';
import { LeaguesClassicStandings } from '../interfaces/leagues-classic-standings.interface';

/**
 * Hooks into available fpl endpoints.
 * The Available end-points are:
 */

axios.defaults.baseURL = 'https://fantasy.premierleague.com/api';

export function bootstrapLoader(): Promise<BootstrapStatic> {
  return dataLoader.load(`/bootstrap-static`);
}

export function elementSummaryLoader(id: number): Promise<ElementSummary> {
  return dataLoader.load(`/element-summary/${id}`);
}

export function entryLoader(id: number): Promise<Entry> {
  return dataLoader.load(`/entry/${id}`);
}

export function entryHistoryLoader(id: number): Promise<EntryHistory> {
  return dataLoader.load(`/entry/${id}/history`);
}

export function entryPicksLoader(
  entryId: number,
  event: number,
): Promise<EntryPicks> {
  return dataLoader.load(`/entry/${entryId}/event/${event}/picks`);
}

export function entryTransfersLoader(id: number): Promise<EntryTransfers> {
  return dataLoader.load(`/entry/${id}/transfers`);
}

export function eventLiveLoader(event: number): Promise<EventLive> {
  return dataLoader.load(`/event/${event}/live`);
}

export function leagueClassicLoader(
  id,
  pageNumber,
): Promise<LeaguesClassicStandings> {
  return dataLoader.load(
    `/leagues-classic-standings/${id}?ls-page=${pageNumber}`,
  );
}

const dataLoader = new DataLoader(keys => {
  console.log(keys);
  return axios.all(
    keys.map((key: string) => axios.get(key).then(response => response.data)),
  );
});

// clear cache every 2 hours
setInterval(() => {
  dataLoader.clearAll();
}, 1000 * 60 * 60 * 2);
