/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface EntryHistory {
  current?: {
    event?: number;
    points?: number;
    total_points?: number;
    rank?: null;
    rank_sort?: null;
    overall_rank?: number;
    bank?: number;
    value?: number;
    event_transfers?: number;
    event_transfers_cost?: number;
    points_on_bench?: number;
    [k: string]: any;
  }[];
  past?: {
    season_name?: string;
    total_points?: number;
    rank?: number;
    [k: string]: any;
  }[];
  chips?: any[];
  [k: string]: any;
}