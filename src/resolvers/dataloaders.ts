import axios from 'axios';
import * as DataLoader from 'dataloader';
import * as humps from 'humps';
import { BootstrapStatic } from '../interfaces/bootstrap-static.interface';
import { EntryPicks } from '../interfaces/entry-picks.interface';
import { EntryTransfers } from '../interfaces/entry-transfers.interface';
import { Entry } from '../interfaces/entry.interface';
import { EventLive } from '../interfaces/event-live.interface';
import { LeaguesClassicStandings } from '../interfaces/leagues-classic-standings.interface';

/**
 * Hooks into available fpl endpoints.
 * The Available end-points are:
 * https://fantasy.premierleague.com/drf/bootstrap-static
 * https://fantasy.premierleague.com/drf/entry/${id}
 * https://fantasy.premierleague.com/drf/entry/${id}/history
 * https://fantasy.premierleague.com/drf/entry/${id}/event/{$event}/picks
 * https://fantasy.premierleague.com/drf/entry/${id}/transfers
 * https://fantasy.premierleague.com/drf/teams
 * https://fantasy.premierleague.com/drf/elements
 * https://fantasy.premierleague.com/drf/events
 * https://fantasy.premierleague.com/drf/game-settings
 * https://fantasy.premierleague.com/drf/event/${event}/live
 * https://fantasy.premierleague.com/drf/leagues-classic-standings/${id}
 * https://fantasy.premierleague.com/drf/dream-team
 */

axios.defaults.baseURL = 'https://fantasy.premierleague.com/drf';

export function bootstrapLoader(): Promise<BootstrapStatic> {
  return dataLoader.load(`/bootstrap-static`);
}

export function entryLoader(id): Promise<Entry> {
  return dataLoader.load(`/entry/${id}/history`);
}

export function entryTransfersLoader(id): Promise<EntryTransfers> {
  return dataLoader.load(`/entry/${id}/transfers`);
}

export function entryPicksLoader(entry: Entry): Promise<EntryPicks[]> {
  const keys = entry.history.map(item => {
    return `/entry/${entry.id}/event/${item.event}/picks`;
  });
  return dataLoader.loadMany(keys);
}

export function eventLiveLoader(entry: Entry): Promise<EventLive[]> {
  const keys = entry.history.map(item => {
    return `/event/${item.event}/live`;
  });
  return dataLoader.loadMany(keys);
}

export function leagueClassicLoader(id): Promise<LeaguesClassicStandings> {
  return dataLoader.load(`/leagues-classic-standings/${id}`);
}

const dataLoader = new DataLoader(keys => {
  return axios.all(
    keys.map((key: string) => {
      return axios.get(key).then(response => {
        return humps.camelizeKeys(response.data);
      });
    }),
  );
});

// clear cache every 2 hours
setInterval(() => {
  dataLoader.clearAll();
}, 1000 * 60 * 60 * 2);
