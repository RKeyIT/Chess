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
      3. this.x - 1 && this.y + 1 === attack on left side
      4. this.x + 1 && this.y + 1 === attack on right side
      5. this.x - 1 && this.y + 2 === en passant on left side
      6. this.x + 1 && this.y + 2 === en passant on right side
    */
    const coords: xyType[] = [];
    // const yFirstMove: yType = String(+this.y + 1) as yType;

    const commonMove: xyType = `${this.x}${String(+this.y + 1) as yType}`;
    const firstMove: xyType = `${this.x}${String(+this.y + 2) as yType}`;

    if (Coordinates.isAvailableXY(commonMove)) {
      coords.push(commonMove);
    }

    if (this.isFirstMove && Coordinates.isAvailableXY(firstMove)) {
      coords.push(firstMove);
    }

    // Left attack
    // Coordinates.isAvailableXY(`${this.x}${String(+this.y + 2) as yType}`);

    return coords;
  }
}
