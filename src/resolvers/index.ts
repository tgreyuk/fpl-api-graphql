import {
  bootstrapLoader,
  elementSummaryLoader,
  entryLoader,
  entryPicksLoader,
  entryTransfersLoader,
  eventLiveLoader,
  leagueClassicLoader,
} from './dataloaders';

export const resolvers = {
  Query: {
    async totalPlayers() {
      const bootstrap = await bootstrapLoader();
      return bootstrap.totalPlayers;
    },
    async currentEvent() {
      const bootstrap = await bootstrapLoader();
      return bootstrap.currentEvent;
    },
    async elements() {
      const bootstrap = await bootstrapLoader();
      return bootstrap.elements;
    },
    async elementSummary(obj, args) {
      const response = await elementSummaryLoader(args.id);
      return response;
    },
    async teams() {
      const bootstrap = await bootstrapLoader();
      return bootstrap.teams;
    },
    async events() {
      const bootstrap = await bootstrapLoader();
      return bootstrap.events;
    },
    async elementTypes() {
      const bootstrap = await bootstrapLoader();
      return bootstrap.elementTypes;
    },
    async entry(obj, args, context) {
      const response = await entryLoader(args.id);
      return {
        ...response.entry,
        history: response.history,
        chips: response.chips,
        season: response.season,
        leagues: response.leagues,
      };
    },
    async leagues(obj, args, context) {
      return true;
    },
  },
  Leagues: {
    async classic(obj, args, context) {
      const response = await leagueClassicLoader(args.id, args.page);
      return response;
    },
  },
  Entry: {
    async transfers(obj, args, context) {
      const response = await entryTransfersLoader(obj.id);
      return {
        history: response.history,
        wildcards: response.wildcards,
      };
    },
    async history(obj, args, context) {
      const [picksData, eventData] = await Promise.all([
        entryPicksLoader(obj),
        eventLiveLoader(obj),
      ]);
      return obj.history.map((item, i) => {
        return {
          ...item,
          picks: picksData[i].picks.map(pick => {
            return {
              ...pick,
              ...eventData[i].elements[pick.element].stats,
            };
          }),
        };
      });
    },
  },
};
