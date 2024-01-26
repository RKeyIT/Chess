import { ReactNode } from 'react';
import { Coordinates, xyType, yType } from '../../Coordinates/Coordinates';
import { Color, Direction, Pieces } from '../../types';
import { Piece } from '../PieceModel';
import { Board } from '../../Board/BoardModel';
import { PieceComponent } from '../PieceComponent';

export class Pawn extends Piece {
  readonly name = Pieces.PAWN;
  readonly direction: Direction;
  readonly component: ReactNode = (<PieceComponent model={this} />);

  public isSelected: boolean = false;
  public isFirstMove = true;

  // FIXME - en passant move can be exist if the pawn first move was on 2 cells forward
  public isUnderEnPassant = false;

  constructor(coords: xyType, color: Color) {
    super(coords, color);
    this.direction = this.color === 'white' ? 1 : -1;
  }

  // FIXME - NOT USABLE METHOD!
  override move = () => {
    const newCoords = (this.x + String(Number(this.y) + 1)) as xyType;
    Board.movePiece(this, newCoords);
  };

  public override getTargets(): xyType[] {
    /* Possible Pawn moves
      1. this.y + 1               === common move
      2. this.y + 2               === available if it first move
      3. this.x - 1 && this.y + 1 === left diagonal attack
      4. this.x + 1 && this.y + 1 === right diagonal attack
      5. this.x - 1 && this.y + 2 === left en passant
      6. this.x + 1 && this.y + 2 === right en passant
    */
    const coords: xyType[] = [];
    // const yFirstMove: yType = String(+this.y + 1) as yType;

    const commonMove: xyType = `${this.x}${
      String(+this.y + this.direction) as yType
    }`;
    const firstMove: xyType = `${this.x}${
      String(+this.y + this.direction * 2) as yType
    }`;

    // 1. Common move
    if (
      Coordinates.isAvailableXY(commonMove) &&
      !Board.getFieldLink(commonMove).piece
    ) {
      coords.push(commonMove);
    }

    // 2. First move
    if (
      this.isFirstMove &&
      Coordinates.isAvailableXY(firstMove) &&
      !Board.getFieldLink(firstMove).piece
    ) {
      coords.push(firstMove);
    }

    const nextY = Coordinates.getNextCoordinate(this.y, this.direction);
    const leftX = Coordinates.getNextCoordinate(this.x, -1);
    const rightX = Coordinates.getNextCoordinate(this.x, 1);
    const leftDiagonalPiece =
      leftX && nextY && Board.getFieldLink(`${leftX}${nextY}`).piece;
    const rightDiagonalPiece =
      rightX && nextY && Board.getFieldLink(`${rightX}${nextY}`).piece;
    const leftPiece = leftX && Board.getFieldLink(`${leftX}${this.y}`).piece;
    const rightPiece = rightX && Board.getFieldLink(`${rightX}${this.y}`).piece;

    // 3. Left diagonal attack
    if (leftDiagonalPiece && leftDiagonalPiece.color !== this.color)
      coords.push(`${leftX}${nextY}`);

    // 4. Right diagonal attack
    if (rightDiagonalPiece && rightDiagonalPiece.color !== this.color)
      coords.push(`${rightX}${nextY}`);

    // 5. Left en passant
    // console.log(
    //   'LP: ',
    //   leftPiece,
    //   leftPiece?.name,
    //   leftPiece?.isUnderEnPassant
    // );
    if (
      leftPiece &&
      leftPiece.name === Pieces.PAWN &&
      leftPiece.isUnderEnPassant
    ) {
      console.log('En Passant case');
      const enPassantY = Coordinates.getNextCoordinate(this.y, this.direction);

      enPassantY && coords.push(`${leftX}${enPassantY}`);
    }

    // 6. Right en passant
    // console.log(
    //   'RP: ',
    //   rightPiece,
    //   rightPiece?.name,
    //   rightPiece?.isUnderEnPassant
    // );
    if (
      rightPiece &&
      rightPiece.name === Pieces.PAWN &&
      rightPiece.isUnderEnPassant
    ) {
      console.log('En Passant case');
      const enPassantY = Coordinates.getNextCoordinate(this.y, this.direction);

      enPassantY && coords.push(`${rightX}${enPassantY}`);
    }

    console.log(coords);

    return coords;
  }
}
