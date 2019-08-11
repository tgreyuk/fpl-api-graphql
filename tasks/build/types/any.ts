import { Schema } from 'json-schemify/dist/schema.interface';

import { parseArray } from './array';
import { parseObject } from './object';
import { parsePrimitive } from './primitive';

export function parse(name: string, jsonSchema: Schema) {
  return jsonSchema.type === 'array'
    ? parseArray(name, jsonSchema)
    : jsonSchema.type === 'object'
    ? parseObject(name, jsonSchema)
    : parsePrimitive(jsonSchema);
}
