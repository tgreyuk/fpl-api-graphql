import {
  bootstrapLoader,
  entryHistoryLoader,
  entryLoader,
  entryPicksLoader,
  eventLiveLoader,
  eventLiveLoaderMany,
} from './dataloaders';

export const resolvers = {
  Query: {
    /*
    async bootstrap() {
      return bootstrapLoader();
    },*/
    async totalPlayers() {
      const bootstrap = await bootstrapLoader();
      return bootstrap.totalPlayers;
    },
    async elements() {
      const bootstrap = await bootstrapLoader();
      return bootstrap.elements;
    },
    async events() {
      const bootstrap = await bootstrapLoader();
      const events = bootstrap.events;
      const finishedEvents = events.filter(event => event.finished);
      const finishedIds = finishedEvents.map(event => event.id);
      const elements = await eventLiveLoaderMany(finishedIds);
      const result = events.map((event, index) => {
        return {
          ...event,
          ...(elements[index] && { elements: elements[index].elements }),
        };
      });
      return result;
    },
    async entry(obj: any, args: { id: number }, context: any) {
      return entryLoader(args.id);
    },
  },

  Entry: {
    async history(obj, args, context) {
      const setup = await Promise.all([
        bootstrapLoader(),
        entryHistoryLoader(obj.id),
      ]);
      const elements = setup[0].elements;
      const history = setup[1];
      const picks = await Promise.all(
        history.current.map(event => {
          return Promise.all([
            eventLiveLoader(event.event),
            entryPicksLoader(obj.id, event.event),
          ]).then(([eventLive, entryPicks]) => {
            return entryPicks.picks.map(pick => {
              const matchedElement = elements.find(
                element => element.id === pick.element,
              );
              const matchedLiveElement = eventLive.elements.find(
                element => element.id === pick.element,
              );
              return {
                ...pick,
                elementType: matchedElement.elementType,
                stats: matchedLiveElement.stats,
              };
            });
          });
        }),
      );
      return {
        chips: history.chips,
        current: history.current.map((currentHistory, index) => {
          return {
            ...currentHistory,
            picks: picks[index],
          };
        }),
        past: history.past,
      };
    },
  },
};
