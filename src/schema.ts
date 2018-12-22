export const typeDefs = `
type Element {
  id: Float
  photo: String
  webName: String
  teamCode: Float
  status: String
  code: Float
  firstName: String
  secondName: String
  squadNumber: String
  news: String
  nowCost: Float
  newsAdded: String
  chanceOfPlayingThisRound: String
  chanceOfPlayingNextRound: String
  valueForm: String
  valueSeason: String
  costChangeStart: Float
  costChangeEvent: Float
  costChangeStartFall: Float
  costChangeEventFall: Float
  inDreamteam: Boolean
  dreamteamCount: Float
  selectedByPercent: String
  form: String
  transfersOut: Float
  transfersIn: Float
  transfersOutEvent: Float
  transfersInEvent: Float
  loansIn: Float
  loansOut: Float
  loanedIn: Float
  loanedOut: Float
  totalPoints: Float
  eventPoints: Float
  pointsPerGame: String
  epThis: String
  epNext: String
  special: Boolean
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
  eaIndex: Float
  elementType: Float
  team: Float
}

type ElementType {
  id: Float
  singularName: String
  singularNameShort: String
  pluralName: String
  pluralNameShort: String
}

type Entry {
  id: Float
  playerFirstName: String
  playerLastName: String
  playerRegionId: Float
  playerRegionName: String
  playerRegionShortIso: String
  summaryOverallPoints: Float
  summaryOverallRank: Float
  summaryEventPoints: Float
  summaryEventRank: Float
  joinedSeconds: Float
  currentEvent: Float
  totalTransfers: Float
  totalLoans: Float
  totalLoansActive: Float
  transfersOrLoans: String
  deleted: Boolean
  email: Boolean
  joinedTime: String
  name: String
  bank: Float
  value: Float
  kit: String
  eventTransfers: Float
  eventTransfersCost: Float
  extraFreeTransfers: Float
  strategy: String
  favouriteTeam: String
  startedEvent: Float
  player: Float
  chips: [EntryChip]
  leagues: EntryLeagues
  season: [EntrySeason]
  history: [EntryHistory]
  transfers: EntryTransfers
}

type EntryChip {
  playedTimeFormatted: String
  status: String
  name: String
  time: String
  chip: Float
  entry: Float
  event: Float
}

type EntryHistory {
  id: Float
  movement: String
  points: Float
  totalPoints: Float
  rank: Float
  rankSort: Float
  overallRank: Float
  targets: String
  eventTransfers: Float
  eventTransfersCost: Float
  value: Float
  pointsOnBench: Float
  bank: Float
  entry: Float
  event: Float
  picks: [EntryHistoryPick]
}

type EntryHistoryPick {
  element: Float
  position: Float
  isCaptain: Boolean
  isViceCaptain: Boolean
  multiplier: Float
  yellowCards: Float
  ownGoals: Float
  creativity: Float
  goalsConceded: Float
  bonus: Float
  redCards: Float
  saves: Float
  influence: Float
  bps: Float
  cleanSheets: Float
  assists: Float
  ictIndex: Float
  goalsScored: Float
  threat: Float
  penaltiesMissed: Float
  totalPoints: Float
  penaltiesSaved: Float
  inDreamteam: Boolean
  minutes: Float
}

type EntryLeagues {
  cup: [String]
  h2h: [String]
  classic: [EntryLeaguesClassic]
}

type EntryLeaguesClassic {
  id: Float
  entryRank: Float
  entryLastRank: Float
  entryMovement: String
  entryChange: String
  entryCanLeave: Boolean
  entryCanAdmin: Boolean
  entryCanInvite: Boolean
  entryCanForum: Boolean
  entryCode: String
  name: String
  shortName: String
  created: String
  closed: Boolean
  forumDisabled: Boolean
  makeCodePublic: Boolean
  rank: String
  size: String
  leagueType: String
  scoring: String
  reprocessStandings: Boolean
  adminEntry: String
  startEvent: Float
}

type EntrySeason {
  id: Float
  seasonName: String
  totalPoints: Float
  rank: Float
  season: Float
  player: Float
}

type EntryTransfers {
  history: [EntryTransfersHistory]
  wildcards: [EntryTransfersWildcard]
}

type EntryTransfersHistory {
  id: Float
  timeFormatted: String
  time: String
  elementInCost: Float
  elementOutCost: Float
  elementIn: Float
  elementOut: Float
  entry: Float
  event: Float
}

type EntryTransfersWildcard {
  playedTimeFormatted: String
  status: String
  name: String
  time: String
  chip: Float
  entry: Float
  event: Float
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
  deadlineTimeFormatted: String
  highestScore: String
  isPrevious: Boolean
  isCurrent: Boolean
  isNext: Boolean
}

type LeagueClassic {
  newEntries: LeagueClassicNewEntries
  league: LeagueClassicLeague
  standings: LeagueClassicStandings
  updateStatus: Float
}

type LeagueClassicLeague {
  id: Float
  leaguebanSet: [String]
  name: String
  shortName: String
  created: String
  closed: Boolean
  forumDisabled: Boolean
  makeCodePublic: Boolean
  rank: String
  size: String
  leagueType: String
  scoring: String
  reprocessStandings: Boolean
  adminEntry: String
  startEvent: Float
}

type LeagueClassicNewEntries {
  hasNext: Boolean
  number: Float
  results: [String]
}

type LeagueClassicStandings {
  hasNext: Boolean
  number: Float
  results: [LeagueClassicStandingsResult]
}

type LeagueClassicStandingsResult {
  id: Float
  entryName: String
  eventTotal: Float
  playerName: String
  movement: String
  ownEntry: Boolean
  rank: Float
  lastRank: Float
  rankSort: Float
  total: Float
  entry: Float
  league: Float
  startEvent: Float
  stopEvent: Float
}

type Query {
  currentEvent: Int
  totalPlayers: Int
  elements: [Element]
  events: [Event]
  teams: [Team]
  elementTypes: [ElementType]
  entry(id: Int): Entry
  leagueClassic(id: Int): LeagueClassic
}

type Team {
  id: Float
  currentEventFixture: [TeamCurrentEventFixture]
  nextEventFixture: [TeamNextEventFixture]
  name: String
  code: Float
  shortName: String
  unavailable: Boolean
  strength: Float
  position: Float
  played: Float
  win: Float
  loss: Float
  draw: Float
  points: Float
  form: String
  linkUrl: String
  strengthOverallHome: Float
  strengthOverallAway: Float
  strengthAttackHome: Float
  strengthAttackAway: Float
  strengthDefenceHome: Float
  strengthDefenceAway: Float
  teamDivision: Float
}

type TeamCurrentEventFixture {
  isHome: Boolean
  day: Float
  eventDay: Float
  month: Float
  id: Float
  opponent: Float
}

type TeamNextEventFixture {
  isHome: Boolean
  day: Float
  eventDay: Float
  month: Float
  id: Float
  opponent: Float
}
`;
