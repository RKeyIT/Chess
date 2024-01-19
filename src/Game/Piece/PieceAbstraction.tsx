import { ReactNode } from 'react';
import { Coordinates, xType, xyType, yType } from '../Coordinates/Coordinates';
import { Color } from '../types';

export abstract class Piece {
  readonly component: ReactNode;
  readonly color: Color;

  private _coordinates!: xyType;
  private _x!: xType;
  private _y!: yType;

  constructor(coords: xyType, color: Color) {
    this.color = color;
    this._coordinates = coords;
    this._x = Coordinates.getX(coords);
    this._y = Coordinates.getY(coords);
  }

  // setNewCoords(coords: xyType) {
  //   const prevCoords = this._coordinates;
  //   const fieldLink = Board.getFieldLink(coords);
  //   fieldLink.piece = null;

  //   this._coordinates = coords;
  //   this._x = Coordinates.getX(coords);
  //   this._y = Coordinates.getY(coords);
  //   fieldLink.piece = this;

  //   console.log(Board.getFieldLink(coords));
  // }

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
