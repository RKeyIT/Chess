import { ReactNode } from 'react';
import { Piece } from '../PieceAbstraction';
import { PieceComponent } from '../PieceComponent';
import { PieceNames } from '../../types';

export class Bishop extends Piece {
  readonly name = PieceNames.BISHOP;
  readonly component: ReactNode = (<PieceComponent model={this} />);
}
