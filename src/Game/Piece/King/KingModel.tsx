import { ReactNode } from 'react';
import { Color, Pieces } from '../../types';
import { Piece } from '../PieceModel';
import { PieceComponent } from '../PieceComponent';
import { Coordinates, xyType } from '../../Coordinates/Coordinates';
import { Board } from '../../Board/BoardModel';

export class King extends Piece {
  readonly name = Pieces.KING;
  readonly component: ReactNode = (<PieceComponent model={this} />);

  constructor(coords: xyType, color: Color) {
    super(coords, color);
  }

  override move = () => {
    const newCoords = (this.x + String(Number(this.y) + 1)) as xyType;
    Board.movePiece(this, newCoords);
  };

  public getTargets(): xyType[] {
    const coords: xyType[] = Coordinates.xyArray.filter((el) => {
      return (
        el !== this.coordinates &&
        Board.getFieldLink(el).piece?.color !== this.color
      );
    });

    return coords;
  }
}
