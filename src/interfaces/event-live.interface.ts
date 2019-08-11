/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface EventLive {
  elements?: {
    id?: number;
    stats?: {
      minutes?: number;
      goals_scored?: number;
      assists?: number;
      clean_sheets?: number;
      goals_conceded?: number;
      own_goals?: number;
      penalties_saved?: number;
      penalties_missed?: number;
      yellow_cards?: number;
      red_cards?: number;
      saves?: number;
      bonus?: number;
      bps?: number;
      influence?: string;
      creativity?: string;
      threat?: string;
      ict_index?: string;
      total_points?: number;
      in_dreamteam?: boolean;
      [k: string]: any;
    };
    explain?: {
      fixture?: number;
      stats?: {
        identifier?: string;
        points?: number;
        value?: number;
        [k: string]: any;
      }[];
      [k: string]: any;
    }[];
    [k: string]: any;
  }[];
  [k: string]: any;
}
