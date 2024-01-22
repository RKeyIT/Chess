import { ReactNode } from 'react';
import { Coordinates, xyType, yType } from '../../Coordinates/Coordinates';
import { Color, Direction, PieceNames } from '../../types';
import { Piece } from '../PieceAbstraction';
import { Board } from '../../Board/BoardModel';
import { PieceComponent } from '../PieceComponent';

export class Pawn extends Piece {
  readonly name = PieceNames.PAWN;
  readonly direction: Direction;
  readonly component: ReactNode = (<PieceComponent model={this} />);

  public isFirstMove = true;
  public isAfterFirstMove = false;

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

    const commonMove: xyType = `${this.x}${String(+this.y + 1) as yType}`;
    const firstMove: xyType = `${this.x}${String(+this.y + 2) as yType}`;

    // 1. Common move
    if (Coordinates.isAvailableXY(commonMove)) {
      coords.push(commonMove);
    }

    // 2. First move
    if (this.isFirstMove && Coordinates.isAvailableXY(firstMove)) {
      coords.push(firstMove);
    }

    // Left diagonal attacks
    const nextY = Coordinates.getNextCoordinate(this.y, this.direction);
    const leftX = Coordinates.getNextCoordinate(this.x, -1);

    if (leftX && nextY) {
      const piece = Board.getFieldLink(`${leftX}${nextY}`).piece;

      // Is this enemy piece?
      if (piece && piece.color !== this.color) {
        // Is it pawn and is it under en passant move?
        if (piece.name === PieceNames.PAWN && piece.isUnderEnPassant) {
          const enPassantY = Coordinates.getNextCoordinate(
            nextY,
            this.direction
          );

          // is exist enMassant coord?
          // 5. Left en passant
          if (enPassantY) coords.push(`${leftX}${enPassantY}`);
        } else {
          // 3. Left diagonal attack
          coords.push(`${leftX}${nextY}`);
        }
      }
    }

    // Right diagonal attack
    const rightX = Coordinates.getNextCoordinate(this.x, 1);

    if (rightX && nextY) {
      const piece = Board.getFieldLink(`${rightX}${nextY}`).piece;

      // Is this enemy piece?
      if (piece && piece.color !== this.color) {
        // Is it pawn and is it under en passant move?
        if (piece.name === PieceNames.PAWN && piece.isUnderEnPassant) {
          const enPassantY = Coordinates.getNextCoordinate(
            nextY,
            this.direction
          );

          // is exist enMassant coord?
          // 5. Right en passant
          if (enPassantY) coords.push(`${rightX}${enPassantY}`);
        } else {
          // 4. Right diagonal attack
          coords.push(`${rightX}${nextY}`);
        }
      }
    }

    return coords;
  }
}
