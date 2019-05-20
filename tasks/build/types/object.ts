import { GraphQLObjectType } from 'graphql';
import { getTypeName } from '../utils';
import { parse } from './any';

export function parseObject(name: string, json: any): any {

  json.properties = json.properties ?  json.properties : json.patternProperties['^(+)+$'].properties;

  const fields = Object.assign(
    {},
    ...Object.entries(json.properties).map(([key, value]) => ({
      [key]: {
        type: parse(getTypeName(name + ' ' + key), value),
      },
    })),
  );

  return new GraphQLObjectType({
    name: getTypeName(name),
    fields,
  });
}
