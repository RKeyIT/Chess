import { ReactNode } from 'react';
import { Piece } from '../PieceAbstraction';
import { PieceComponent } from '../PieceComponent';
import { PieceNames } from '../../types';

export class King extends Piece {
  readonly name = PieceNames.KING;
  readonly component: ReactNode = (<PieceComponent model={this} />);
}
