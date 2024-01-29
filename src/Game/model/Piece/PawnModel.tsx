import { Coordinates, xType, xyType, yType } from '../Coordinates';
import { Color, Direction, Pieces } from '../../types';
import { Piece } from './PieceModel';
import { Board } from '../BoardModel';

export class Pawn extends Piece {
  readonly name = Pieces.PAWN;
  readonly direction: Direction;
  readonly _targets: xyType[] = [];

  public isSelected: boolean = false;
  public isFirstMove = true;

  // FIXME - en passant move can be exist if the pawn first move was on 2 cells forward
  public isUnderEnPassant = false;

  constructor(coords: xyType, color: Color) {
    super(coords, color);
    this.direction = this.color === 'white' ? 1 : -1;
  }

  get targets(): xyType[] {
    // Re-Zero targets
    this._targets.length = 0;

    /* Possible Pawn moves
      1. this.y + 1               === common move
      2. this.y + 2               === available if it first move
      3. this.x - 1 && this.y + 1 === left diagonal attack
      4. this.x + 1 && this.y + 1 === right diagonal attack
      5. this.x - 1 && this.y + 2 === left en passant
      6. this.x + 1 && this.y + 2 === right en passant
    */

    const getPiece = (x: xType | null, y: yType | null) => {
      return x && y && Board.getFieldLink(`${x}${y}`).piece;
    };

    const isEnPassantable = (piece: Piece) => {
      return piece.name === Pieces.PAWN && piece.isUnderEnPassant;
    };

    // FIXME - use Coordinates static methods!
    const x = this.x;
    const y = this.y;

    const nextY = Coordinates.getNextCoordinate(y, this.direction);

    if (!nextY) {
      // NOTE - Leaving method if we on bound of board
      return this._targets;
    }

    const leftX = Coordinates.getNextCoordinate(x, -1);
    const rightX = Coordinates.getNextCoordinate(x, 1);

    const leftDiagonalPiece = getPiece(leftX, nextY);
    const rightDiagonalPiece = getPiece(rightX, nextY);
    const leftPiece = getPiece(leftX, y);
    const rightPiece = getPiece(rightX, y);

    // 1. Common move
    if (!getPiece(x, nextY)) {
      this._targets.push(`${x}${nextY}`);
    }

    // 2. First move
    if (this.isFirstMove) {
      const dblY = Coordinates.getNextCoordinate(nextY, this.direction);

      if (dblY && !getPiece(x, nextY) && !getPiece(x, dblY)) {
        this._targets.push(`${x}${dblY}`);
      }
    }

    if (leftX) {
      // 3. Left diagonal attack
      if (leftDiagonalPiece && leftDiagonalPiece.color !== this.color)
        this._targets.push(`${leftX}${nextY}`);

      // 5. Left en passant
      if (leftPiece && isEnPassantable(leftPiece)) {
        console.log('Left En Passant case');
        const enPassantY = Coordinates.getNextCoordinate(
          this.y,
          this.direction
        );

        enPassantY && this._targets.push(`${leftX}${enPassantY}`);
      }
    }

    if (rightX) {
      // 4. Right diagonal attack
      if (rightDiagonalPiece && rightDiagonalPiece.color !== this.color)
        this._targets.push(`${rightX}${nextY}`);

      // 6. Right en passant
      if (rightPiece && isEnPassantable(rightPiece)) {
        console.log('Right En Passant case');
        const enPassantY = Coordinates.getNextCoordinate(
          this.y,
          this.direction
        );

        enPassantY && this._targets.push(`${rightX}${enPassantY}`);
      }
    }

    return this._targets;
  }
}
