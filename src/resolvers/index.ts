import {
  bootstrapLoader,
  entryLoader,
  entryPicksLoader,
  entryTransfersLoader,
  eventLiveLoader,
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
