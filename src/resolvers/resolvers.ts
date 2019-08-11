import {
  bootstrapLoader,
  elementSummaryLoader,
  entryHistoryLoader,
  entryLoader,
  entryPicksLoader,
  eventLiveLoader,
} from './dataloaders';

export const resolvers = {
  Query: {
    async static() {
      return bootstrapLoader();
    },
    async entry(obj, args, context) {
      return entryLoader(args.id);
    },
    async eventElements(obj, args, context) {
      const data = await eventLiveLoader(args.id);
      return data.elements;
    },
    async elementSummary(obj, args, context) {
      return elementSummaryLoader(args.id);
    },
  },
  Entry: {
    async history(obj, args, context) {
      return entryHistoryLoader(args.id);
    },
    async picks(obj, args, context) {
      return entryPicksLoader(obj.id, args.event);
    },
  },
};
