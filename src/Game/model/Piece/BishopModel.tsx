import { ReactNode } from 'react';
import { Piece } from './PieceModel';
import { Color, Pieces } from '../../types';
import { xyType } from '../Coordinates';

export class Bishop extends Piece {
  // Pawn specific fields. In other pieces the type is hardly "false"
  readonly isFirstMove: false = false;
  readonly isUnderEnPassant: false = false;

  // Other fields
  readonly name = Pieces.BISHOP;

  readonly _targets: xyType[] = [];
  public isSelected: boolean = false;

  get targets() {
    return this._targets;
  }

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }
}
