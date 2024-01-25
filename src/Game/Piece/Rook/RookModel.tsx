import { ReactNode } from 'react';
import { Piece } from '../PieceModel';
import { PieceComponent } from '../PieceComponent';
import { Color, Pieces } from '../../types';
import { Board } from '../../Board/BoardModel';
import { xyType } from '../../Coordinates/Coordinates';

export class Rook extends Piece {
  readonly name = Pieces.ROOK;
  readonly component: ReactNode = (<PieceComponent model={this} />);

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }

  override move = () => {
    const newCoords = (this.x + String(Number(this.y) + 1)) as xyType;
    Board.movePiece(this, newCoords);
  };
}
