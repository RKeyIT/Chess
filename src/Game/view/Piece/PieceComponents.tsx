import { ReactNode } from 'react';
import {
  BishopComponent,
  KingComponent,
  KnightComponent,
  PawnComponent,
  QueenComponent,
  RookComponent,
} from '.';
import { Piece } from '../../model/Piece/PieceModel';
import { Pieces } from '../../types';

export class PieceComponents {
  private constructor() {}

  public static get(piece: Piece): ReactNode {
    switch (piece.name) {
      case Pieces.KING:
        return <KingComponent model={piece} />;
      case Pieces.QUEEN:
        return <QueenComponent model={piece} />;
      case Pieces.BISHOP:
        return <BishopComponent model={piece} />;
      case Pieces.KNIGHT:
        return <KnightComponent model={piece} />;
      case Pieces.ROOK:
        return <RookComponent model={piece} />;
      case Pieces.PAWN:
        return <PawnComponent model={piece} />;
      default:
        throw new Error(`Wrong name: "${piece.name}" of model: ${piece}`);
    }
  }
}
