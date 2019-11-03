export const typeDefs = `
type Element {
  chanceOfPlayingNextRound: String
  chanceOfPlayingThisRound: String
  code: Float
  costChangeEvent: Float
  costChangeEventFall: Float
  costChangeStart: Float
  costChangeStartFall: Float
  dreamteamCount: Float
  elementType: Float
  epNext: String
  epThis: String
  eventPoints: Float
  firstName: String
  form: String
  id: Float
  inDreamteam: Boolean
  news: String
  newsAdded: String
  nowCost: Float
  photo: String
  pointsPerGame: String
  secondName: String
  selectedByPercent: String
  special: Boolean
  squadNumber: String
  status: String
  team: Float
  teamCode: Float
  totalPoints: Float
  transfersIn: Float
  transfersInEvent: Float
  transfersOut: Float
  transfersOutEvent: Float
  valueForm: String
  valueSeason: String
  webName: String
  minutes: Float
  goalsScored: Float
  assists: Float
  cleanSheets: Float
  goalsConceded: Float
  ownGoals: Float
  penaltiesSaved: Float
  penaltiesMissed: Float
  yellowCards: Float
  redCards: Float
  saves: Float
  bonus: Float
  bps: Float
  influence: String
  creativity: String
  threat: String
  ictIndex: String
}

type Entry {
  id: Float
  joinedTime: String
  startedEvent: Float
  favouriteTeam: String
  playerFirstName: String
  playerLastName: String
  playerRegionId: Float
  playerRegionName: String
  playerRegionIsoCodeShort: String
  playerRegionIsoCodeLong: String
  summaryOverallPoints: Float
  summaryOverallRank: Float
  summaryEventPoints: Float
  summaryEventRank: Float
  currentEvent: Float
  leagues: EntryLeagues
  name: String
  kit: String
  lastDeadlineBank: Float
  lastDeadlineValue: Float
  lastDeadlineTotalTransfers: Float
  history: EntryHistory
}

type EntryHistory {
  current: [EntryHistoryCurrent]
  past: [EntryHistoryPast]
  chips: [EntryHistoryChip]
}

type EntryHistoryChip {
  name: String
  time: String
  event: Float
}

type EntryHistoryCurrent {
  event: Float
  points: Float
  totalPoints: Float
  rank: Float
  rankSort: Float
  overallRank: Float
  bank: Float
  value: Float
  eventTransfers: Float
  eventTransfersCost: Float
  pointsOnBench: Float
  picks: [EntryHistoryCurrentPick]
}

type EntryHistoryCurrentPick {
  element: Float
  position: Float
  multiplier: Float
  isCaptain: Boolean
  isViceCaptain: Boolean
  elementType: Float
  stats: EntryHistoryCurrentPickStats
}

type EntryHistoryCurrentPickStats {
  minutes: Float
  goalsScored: Float
  assists: Float
  cleanSheets: Float
  goalsConceded: Float
  ownGoals: Float
  penaltiesSaved: Float
  penaltiesMissed: Float
  yellowCards: Float
  redCards: Float
  saves: Float
  bonus: Float
  bps: Float
  influence: String
  creativity: String
  threat: String
  ictIndex: String
  totalPoints: Float
  inDreamteam: Boolean
}

type EntryHistoryPast {
  seasonName: String
  totalPoints: Float
  rank: Float
}

type EntryLeagues {
  classic: [EntryLeaguesClassic]
  h2h: [String]
}

type EntryLeaguesClassic {
  id: Float
  name: String
  shortName: String
  created: String
  closed: Boolean
  rank: String
  maxEntries: String
  leagueType: String
  scoring: String
  adminEntry: String
  startEvent: Float
  entryRank: Float
  entryLastRank: Float
  entryCanLeave: Boolean
  entryCanAdmin: Boolean
  entryCanInvite: Boolean
}

type Event {
  id: Float
  name: String
  deadlineTime: String
  averageEntryScore: Float
  finished: Boolean
  dataChecked: Boolean
  highestScoringEntry: String
  deadlineTimeEpoch: Float
  deadlineTimeGameOffset: Float
  highestScore: String
  isPrevious: Boolean
  isCurrent: Boolean
  isNext: Boolean
  chipPlays: [EventChipPlay]
  mostSelected: String
  mostTransferredIn: String
  topElement: String
  topElementInfo: EventTopElementInfo
  transfersMade: Float
  mostCaptained: String
  mostViceCaptained: String
  elements: [EventElement]
}

type EventChipPlay {
  chipName: String
  numPlayed: Float
}

type EventElement {
  id: Float
  stats: EventElementStats
  explain: [EventElementExplain]
}

type EventElementExplain {
  fixture: Float
  stats: [EventElementExplainStat]
}

type EventElementExplainStat {
  identifier: String
  points: Float
  value: Float
}

type EventElementStats {
  minutes: Float
  goalsScored: Float
  assists: Float
  cleanSheets: Float
  goalsConceded: Float
  ownGoals: Float
  penaltiesSaved: Float
  penaltiesMissed: Float
  yellowCards: Float
  redCards: Float
  saves: Float
  bonus: Float
  bps: Float
  influence: String
  creativity: String
  threat: String
  ictIndex: String
  totalPoints: Float
  inDreamteam: Boolean
}

type EventTopElementInfo {
  id: Float
  points: Float
}

type Query {
  totalPlayers: Float
  elements: [Element]
  events: [Event]
  entry(id: Int): Entry
}
`;
