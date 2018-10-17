import { GraphQLBoolean, GraphQLFloat, GraphQLString } from 'graphql';

export function parsePrimitive(jsonSchema) {
  return jsonSchema.type === 'boolean'
    ? GraphQLBoolean
    : jsonSchema.type === 'integer'
    ? GraphQLFloat
    : jsonSchema.type === 'number'
    ? GraphQLFloat
    : GraphQLString;
}
