import { ReactNode } from 'react';
import { xyType } from '../../Coordinates/Coordinates';
import { Color, PieceNames } from '../../types';
import { Piece } from '../PieceAbstraction';
import { Board } from '../../Board/BoardModel';
import { PieceComponent } from '../PieceComponent';

export class Pawn extends Piece {
  readonly name = PieceNames.PAWN;
  readonly component: ReactNode = (<PieceComponent model={this} />);

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }

  override move = () => {
    const newCoords = (this.x + String(Number(this.y) + 1)) as xyType;
    Board.movePiece(this, newCoords);
  };
}
