import { ReactNode } from 'react';
import { Coordinates, xType, xyType, yType } from '../Coordinates/Coordinates';
import { Color } from '../types';

export class Cell {
  readonly component: ReactNode;
  readonly coordinate: xyType;
  readonly x: xType;
  readonly y: yType;
  readonly color: Color;

  constructor(coordinate: xyType) {
    this.coordinate = coordinate;
    [this.x, this.y] = Coordinates.xyStringToArr(coordinate);
    this.color = this.defineColor(this.x, this.y);
  }

  private defineColor(x: xType, y: yType): Color {
    if (Number(y) % 2) {
      return ['A', 'C', 'E', 'G'].some((el) => el === x) ? 'black' : 'white';
    } else {
      return ['B', 'D', 'F', 'H'].some((el) => el === x) ? 'black' : 'white';
    }
  }
}
