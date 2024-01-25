import { ReactNode } from 'react';
import { Coordinates, xType, xyType, yType } from '../Coordinates/Coordinates';
import { Color, Direction, Pieces } from '../types';
import { Board } from '../Board/BoardModel';

export abstract class Piece {
  readonly name: Pieces = Pieces.KING;
  readonly component: ReactNode;
  readonly color: Color;

  private _coordinates!: xyType;
  private _x!: xType;
  private _y!: yType;

  // PAWN SPECIFIC FLAGS
  readonly direction: Direction;
  public isFirstMove: boolean = false;
  public isUnderEnPassant: boolean = false;
  // PAWN SPECIFIC FLAGS

  public isSelected: boolean = false;

  constructor(coords: xyType, color: Color) {
    this.color = color;
    this.setNewCoords(coords);
    this.direction = color === 'white' ? 1 : -1;
  }

  public getTargets(): xyType[] {
    const coords: xyType[] = Coordinates.xyArray.filter((el) => {
      return (
        el !== this.coordinates &&
        Board.getFieldLink(el).piece?.color !== this.color
      );
    });

    return coords;
  }

  setNewCoords(coords: xyType) {
    this._coordinates = coords;
    this._x = Coordinates.getX(coords);
    this._y = Coordinates.getY(coords);
  }

  move = (): void => {};

  get coordinates() {
    return this._coordinates;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
