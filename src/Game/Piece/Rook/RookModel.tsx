import { ReactNode } from 'react';
import { Piece } from '../PieceAbstraction';
import { PieceComponent } from '../PieceComponent';
import { PieceNames } from '../../types';

export class Rook extends Piece {
  readonly name = PieceNames.ROOK;
  readonly component: ReactNode = (<PieceComponent model={this} />);
}
