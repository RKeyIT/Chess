import { xyType } from '../model/Coordinates';
import { Piece } from '../model/Piece/PieceModel';

export class Movement {
  private constructor() {
  }

  static move(piece: Piece, xy: xyType): void {}
  static eat(piece: Piece, xy: xyType): void {}
  static replacePawn(piece: Piece, xy: xyType): void {}
}
