import { ReactNode } from 'react';
import { Coordinates, xType, xyType, yType } from '../Coordinates/Coordinates';
import { Color } from '../types';
import { CellComponent } from './CellComponent';

export class Cell {
  readonly component: ReactNode;
  readonly coordinates: xyType;
  readonly x: xType;
  readonly y: yType;
  readonly color: Color;

  constructor(coordinates: xyType) {
    this.coordinates = coordinates;
    this.x = Coordinates.getX(coordinates);
    this.y = Coordinates.getY(coordinates);
    this.color = this.defineColor(this.x, this.y);
    this.component = <CellComponent CellModel={this} />;
  }

  private defineColor(x: xType, y: yType): Color {
    if (Number(y) % 2) {
      return ['A', 'C', 'E', 'G'].some((el) => el === x) ? 'black' : 'white';
    } else {
      return ['B', 'D', 'F', 'H'].some((el) => el === x) ? 'black' : 'white';
    }
  }
}
