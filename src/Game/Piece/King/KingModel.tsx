import { ReactNode } from 'react';
import { Color, PieceNames } from '../../types';
import { Piece } from '../PieceAbstraction';
import { PieceComponent } from '../PieceComponent';
import { xyType } from '../../Coordinates/Coordinates';
import { Board } from '../../Board/BoardModel';

export class King extends Piece {
  readonly name = PieceNames.KING;
  readonly component: ReactNode = (<PieceComponent model={this} />);

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }

  override move = () => {
    const newCoords = (this.x + String(Number(this.y) + 1)) as xyType;
    Board.movePiece(this, newCoords);
  };
}
