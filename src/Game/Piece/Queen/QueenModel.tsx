import { ReactNode } from 'react';
import { Piece } from '../PieceAbstraction';
import { PieceComponent } from '../PieceComponent';
import { PieceNames } from '../../types';

export class Queen extends Piece {
  readonly name = PieceNames.QUEEN;
  readonly component: ReactNode = (<PieceComponent model={this} />);
}
