export const typeDefs = `
type Element {
  chance_of_playing_next_round: String
  chance_of_playing_this_round: String
  code: Float
  cost_change_event: Float
  cost_change_event_fall: Float
  cost_change_start: Float
  cost_change_start_fall: Float
  dreamteam_count: Float
  element_type: Float
  ep_next: String
  ep_this: String
  event_points: Float
  first_name: String
  form: String
  id: Float
  in_dreamteam: Boolean
  news: String
  news_added: String
  now_cost: Float
  photo: String
  points_per_game: String
  second_name: String
  selected_by_percent: String
  special: Boolean
  squad_number: String
  status: String
  team: Float
  team_code: Float
  total_points: Float
  transfers_in: Float
  transfers_in_event: Float
  transfers_out: Float
  transfers_out_event: Float
  value_form: String
  value_season: String
  web_name: String
  minutes: Float
  goals_scored: Float
  assists: Float
  clean_sheets: Float
  goals_conceded: Float
  own_goals: Float
  penalties_saved: Float
  penalties_missed: Float
  yellow_cards: Float
  red_cards: Float
  saves: Float
  bonus: Float
  bps: Float
  influence: String
  creativity: String
  threat: String
  ict_index: String
}

type ElementStat {
  label: String
  name: String
}

type ElementSummary {
  fixtures: [ElementSummaryFixture]
  history: [ElementSummaryHistory]
  history_past: [ElementSummaryHistoryPast]
}

type ElementSummaryFixture {
  code: Float
  team_h: Float
  team_h_score: String
  team_a: Float
  team_a_score: String
  event: Float
  finished: Boolean
  minutes: Float
  provisional_start_time: Boolean
  kickoff_time: String
  event_name: String
  is_home: Boolean
  difficulty: Float
}

type ElementSummaryHistory {
  element: Float
  fixture: Float
  opponent_team: Float
  total_points: Float
  was_home: Boolean
  kickoff_time: String
  team_h_score: Float
  team_a_score: Float
  round: Float
  minutes: Float
  goals_scored: Float
  assists: Float
  clean_sheets: Float
  goals_conceded: Float
  own_goals: Float
  penalties_saved: Float
  penalties_missed: Float
  yellow_cards: Float
  red_cards: Float
  saves: Float
  bonus: Float
  bps: Float
  influence: String
  creativity: String
  threat: String
  ict_index: String
  value: Float
  transfers_balance: Float
  selected: Float
  transfers_in: Float
  transfers_out: Float
}

type ElementSummaryHistoryPast {
  season_name: String
  element_code: Float
  start_cost: Float
  end_cost: Float
  total_points: Float
  minutes: Float
  goals_scored: Float
  assists: Float
  clean_sheets: Float
  goals_conceded: Float
  own_goals: Float
  penalties_saved: Float
  penalties_missed: Float
  yellow_cards: Float
  red_cards: Float
  saves: Float
  bonus: Float
  bps: Float
  influence: String
  creativity: String
  threat: String
  ict_index: String
}

type ElementType {
  id: Float
  plural_name: String
  plural_name_short: String
  singular_name: String
  singular_name_short: String
  squad_select: Float
  squad_min_play: Float
  squad_max_play: Float
  ui_shirt_specific: Boolean
  sub_positions_locked: [Float]
}

type Entry {
  id: Float
  joined_time: String
  started_event: Float
  favourite_team: String
  player_first_name: String
  player_last_name: String
  player_region_id: Float
  player_region_name: String
  player_region_iso_code_short: String
  player_region_iso_code_long: String
  summary_overall_points: Float
  summary_overall_rank: Float
  summary_event_points: Float
  summary_event_rank: Float
  current_event: Float
  leagues: EntryLeagues
  name: String
  kit: String
  last_deadline_bank: Float
  last_deadline_value: Float
  last_deadline_total_transfers: Float
  history(event: Int): EntryHistory
  picks(event: Int): EntryPicks
}

type EntryHistory {
  current: [EntryHistoryCurrent]
  past: [EntryHistoryPast]
  chips: [String]
}

type EntryHistoryCurrent {
  event: Float
  points: Float
  total_points: Float
  rank: Float
  rank_sort: Float
  overall_rank: Float
  bank: Float
  value: Float
  event_transfers: Float
  event_transfers_cost: Float
  points_on_bench: Float
}

type EntryHistoryPast {
  season_name: String
  total_points: Float
  rank: Float
}

type EntryLeagues {
  classic: [EntryLeaguesClassic]
  h2h: [String]
}

type EntryLeaguesClassic {
  id: Float
  name: String
  short_name: String
  created: String
  closed: Boolean
  rank: String
  max_entries: String
  league_type: String
  scoring: String
  admin_entry: String
  start_event: Float
  entry_rank: Float
  entry_last_rank: Float
  entry_can_leave: Boolean
  entry_can_admin: Boolean
  entry_can_invite: Boolean
}

type EntryPicks {
  active_chip: String
  automatic_subs: [EntryPicksAutomaticSub]
  entry_history: EntryPicksEntryHistory
  picks: [EntryPicksPick]
}

type EntryPicksAutomaticSub {
  entry: Float
  element_in: Float
  element_out: Float
  event: Float
}

type EntryPicksEntryHistory {
  event: Float
  points: Float
  total_points: Float
  rank: Float
  rank_sort: Float
  overall_rank: Float
  bank: Float
  value: Float
  event_transfers: Float
  event_transfers_cost: Float
  points_on_bench: Float
}

type EntryPicksPick {
  element: Float
  position: Float
  multiplier: Float
  is_captain: Boolean
  is_vice_captain: Boolean
}

type Event {
  id: Float
  name: String
  deadline_time: String
  average_entry_score: Float
  finished: Boolean
  data_checked: Boolean
  highest_scoring_entry: String
  deadline_time_epoch: Float
  deadline_time_game_offset: Float
  highest_score: String
  is_previous: Boolean
  is_current: Boolean
  is_next: Boolean
  chip_plays: [EventChipPlay]
  most_selected: String
  most_transferred_in: String
  top_element: String
  top_element_info: EventTopElementInfo
  transfers_made: Float
  most_captained: String
  most_vice_captained: String
}

type EventChipPlay {
  chip_name: String
  num_played: Float
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
  goals_scored: Float
  assists: Float
  clean_sheets: Float
  goals_conceded: Float
  own_goals: Float
  penalties_saved: Float
  penalties_missed: Float
  yellow_cards: Float
  red_cards: Float
  saves: Float
  bonus: Float
  bps: Float
  influence: String
  creativity: String
  threat: String
  ict_index: String
  total_points: Float
  in_dreamteam: Boolean
}

type EventTopElementInfo {
  id: Float
  points: Float
}

type GameSettings {
  league_join_private_max: Float
  league_join_public_max: Float
  league_max_size_public_classic: Float
  league_max_size_public_h2h: Float
  league_max_size_private_h2h: Float
  league_max_ko_rounds_private_h2h: Float
  league_prefix_public: String
  league_points_h2h_win: Float
  league_points_h2h_lose: Float
  league_points_h2h_draw: Float
  squad_squadplay: Float
  squad_squadsize: Float
  squad_team_limit: Float
  squad_total_spend: Float
  ui_currency_multiplier: Float
  ui_use_special_shirts: Boolean
  ui_special_shirt_exclusions: [String]
  stats_form_days: Float
  sys_vice_captain_enabled: Boolean
  transfers_sell_on_fee: Float
  cup_start_event_id: Float
  timezone: String
}

type Phase {
  id: Float
  name: String
  start_event: Float
  stop_event: Float
}

type Query {
  static: Static
  entry(id: Int): Entry
  eventElements(event: Int): [EventElement]
  elementSummary(id: Int): ElementSummary
}

type Static {
  events: [Event]
  game_settings: GameSettings
  phases: [Phase]
  teams: [Team]
  total_players: Float
  elements: [Element]
  element_stats: [ElementStat]
  element_types: [ElementType]
}

type Team {
  code: Float
  draw: Float
  form: String
  id: Float
  loss: Float
  name: String
  played: Float
  points: Float
  position: Float
  short_name: String
  strength: Float
  team_division: String
  unavailable: Boolean
  win: Float
  strength_overall_home: Float
  strength_overall_away: Float
  strength_attack_home: Float
  strength_attack_away: Float
  strength_defence_home: Float
  strength_defence_away: Float
}
`;
