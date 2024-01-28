import { xyType } from '../model/Coordinates';
import { Piece } from '../model/Piece/PieceModel';
// import { Controller } from './Controller'; // type of any controller class can be extended by others

export class Movement {
  private constructor() {}

  static move(piece: Piece, xy: xyType): void {}
  static eat(piece: Piece, xy: xyType): void {}
  static replacePawn(piece: Piece, xy: xyType): void {}
}
