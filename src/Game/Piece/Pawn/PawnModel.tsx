import { ReactNode } from 'react';
import { xyType } from '../../Coordinates/Coordinates';
import { Color } from '../../types';
import { Piece } from '../PieceAbstraction';
import { PawnComponent } from './PawnComponent';
import { Board } from '../../Board/BoardModel';

export class Pawn extends Piece {
  readonly component: ReactNode = (<PawnComponent model={this} />);

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }

  override move = () => {
    console.log(this.coordinates);
    const newCoords = (this.x + String(Number(this.y) + 1)) as xyType;
    Board.movePiece(this, newCoords);
    console.log(this.coordinates);
  };
}
