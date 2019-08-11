import { GraphQLObjectType } from 'graphql';

import { getTypeName } from '../utils';
import { parseObjectFields } from './object.fields';

export function parseObject(name: string, json: any): any {
  return new GraphQLObjectType({
    name: getTypeName(name),
    fields: parseObjectFields(name, json),
  });
}
