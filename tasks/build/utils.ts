import { startCase } from 'lodash';

export function getTypeName(name: string) {
  let typeName = startCase(name).replace(/\s/g, '');

  if (typeName !== 'Static') {
    typeName = typeName.replace(/Static/g, '');
  }

  return typeName;
}
