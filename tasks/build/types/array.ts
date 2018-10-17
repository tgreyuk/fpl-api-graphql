import { Schema as JsonSchema } from 'json-schemify/dist/schema.interface';

import { isArray, startCase } from 'lodash';
import { parse } from './any';

import { GraphQLList } from 'graphql';

import * as pluralize from 'pluralize';
import { getTypeName } from '../utils';

export function parseArray(name: string, jsonSchema: JsonSchema): any {
  if (jsonSchema.items && !isArray(jsonSchema.items)) {
    return new GraphQLList(
      parse(pluralize.singular(getTypeName(name)), jsonSchema.items),
    );
  }
}
