import { Coordinates, xType, xyType, yType } from './Coordinates';
import { Color } from '../types';
import { Board, IBoardField } from './BoardModel';

export class Cell {
  readonly coordinates: xyType;
  readonly x: xType;
  readonly y: yType;
  readonly color: Color;

  // NOTE - this field will be "lazy" initialized (check getter)
  private _boardField!: IBoardField;

  private _isUnderAttack: boolean = false;
  get isUnderAttack() {
    return this._isUnderAttack;
  }
  set isUnderAttack(value: boolean) {
    this._isUnderAttack = value;
  }

  constructor(coordinates: xyType) {
    this.coordinates = coordinates;
    this.x = Coordinates.getX(coordinates);
    this.y = Coordinates.getY(coordinates);
    this.color = this.defineColor(this.x, this.y);
  }

  // NOTE - "Lazy initialisation" pattern
  get boardField() {
    if (!this._boardField) {
      this._boardField = Board.getFieldLink(this.coordinates);
    }

    return this._boardField;
  }

  private defineColor(x: xType, y: yType): Color {
    if (Number(y) % 2) {
      return ['A', 'C', 'E', 'G'].some((el) => el === x) ? 'black' : 'white';
    } else {
      return ['B', 'D', 'F', 'H'].some((el) => el === x) ? 'black' : 'white';
    }
  }
}
