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
    totalPoints?: number;
    rank?: number;
    rankSort?: number;
    overallRank?: number;
    bank?: number;
    value?: number;
    eventTransfers?: number;
    eventTransfersCost?: number;
    pointsOnBench?: number;
    [k: string]: any;
  }[];
  past?: {
    seasonName?: string;
    totalPoints?: number;
    rank?: number;
    [k: string]: any;
  }[];
  chips?: {
    name?: string;
    time?: string;
    event?: number;
    [k: string]: any;
  }[];
  [k: string]: any;
}
