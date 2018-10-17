import { startCase } from 'lodash';

export function getTypeName(name: string) {
  return startCase(name).replace(/\s/g, '');
}
