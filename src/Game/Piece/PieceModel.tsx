import { ReactNode } from 'react';
import { Coordinates, xType, xyType, yType } from '../Coordinates/Coordinates';
import { Color, Direction, Pieces } from '../types';
import { BoardTypeObject } from '../Board/BoardModel';

export abstract class Piece {
  abstract readonly name: Pieces;
  abstract readonly component: ReactNode;
  readonly color: Color;

  private _coordinates!: xyType;
  private _x!: xType;
  private _y!: yType;

  // PAWN SPECIFIC FLAGS
  readonly direction: Direction;
  abstract isFirstMove: boolean;
  abstract isUnderEnPassant: boolean;
  // PAWN SPECIFIC FLAGS

  abstract isSelected: boolean;
  abstract readonly _targets: xyType[];

  // setting and return targets array
  abstract get targets(): xyType[];

  constructor(coords: xyType, color: Color) {
    this.setNewCoords(coords);
    this.color = color;
    this.direction = color === 'white' ? 1 : -1;
  }

  // public getTargets(): xyType[] {
  //   const coords: xyType[] = Coordinates.xyArray.filter((el) => {
  //     return (
  //       el !== this.coordinates &&
  //       Board.getFieldLink(el).piece?.color !== this.color
  //     );
  //   });

  //   return coords;
  // }

  setNewCoords(coords: xyType) {
    this._coordinates = coords;
    this._x = Coordinates.getX(coords);
    this._y = Coordinates.getY(coords);
  }

  public move(board: BoardTypeObject, newCoords: xyType): void {
    // FIXME - Fix piece selection view
    // TODO - En Passant special move
    /* 
      1. If it was first move of current pawn - set this flag to false
      2. Add this coordinates to board.underEnPassantCoords[]
    */

    board[this.coordinates].piece = null;
    board[newCoords].piece = this;
    this.setNewCoords(newCoords);
  }

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
