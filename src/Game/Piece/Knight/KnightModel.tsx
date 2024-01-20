import { ReactNode } from 'react';
import { Piece } from '../PieceAbstraction';
import { PieceComponent } from '../PieceComponent';
import { PieceNames } from '../../types';

export class Knight extends Piece {
  readonly name = PieceNames.KNIGHT;
  readonly component: ReactNode = (<PieceComponent model={this} />);
}
