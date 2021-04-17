import { Coordinate } from '../types/models';

export const isCoordinate = (obj: any): obj is Coordinate => {
  return obj && !isNaN(Number(obj.x)) && !isNaN(Number(obj.y));
};
