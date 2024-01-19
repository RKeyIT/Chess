import { ReactNode } from 'react';
import { xyType } from '../../Coordinates/Coordinates';
import { Color } from '../../types';
import { Piece } from '../PieceAbstraction';
import { PawnComponent } from './PawnComponent';

export class Pawn extends Piece {
  readonly component: ReactNode = (<PawnComponent color={this.color} />);

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }
}
