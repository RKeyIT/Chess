import { Color, Pieces } from '../../types';
import { Piece } from './PieceModel';
import { xyType } from '../Coordinates';

export class King extends Piece {
  // Pawn specific fields. In other pieces the type is hardly "false"
  readonly isFirstMove: false = false;
  readonly isUnderEnPassant: false = false;

  // Other fields
  readonly name = Pieces.KING;

  readonly _targets: xyType[] = [];
  public isSelected: boolean = false;

  get targets() {
    return this._targets;
  }

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }
}
