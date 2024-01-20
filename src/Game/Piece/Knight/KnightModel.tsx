import { ReactNode } from 'react';
import { Piece } from '../PieceAbstraction';
import { PieceComponent } from '../PieceComponent';
import { Color, PieceNames } from '../../types';
import { Board } from '../../Board/BoardModel';
import { xyType } from '../../Coordinates/Coordinates';

export default class Knight extends Piece {
  readonly name = PieceNames.KNIGHT;
  readonly component: ReactNode = (<PieceComponent model={this} />);

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }

  override move = () => {
    const newCoords = (this.x + String(Number(this.y) + 1)) as xyType;
    Board.movePiece(this, newCoords);
  };
}
