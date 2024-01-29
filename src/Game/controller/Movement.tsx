import { xyType } from '../model/Coordinates';
import { Piece } from '../model/Piece/PieceModel';
import { Controller } from './Controller';

export class Movement extends Controller {
  private constructor() {
    super();
  }

  static move(piece: Piece, xy: xyType): void {}
  static eat(piece: Piece, xy: xyType): void {}
  static replacePawn(piece: Piece, xy: xyType): void {}
}
