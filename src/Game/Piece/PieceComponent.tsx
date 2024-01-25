import { Pieces } from '../types';
import { BishopComponent } from './Bishop/BishopComponent';
import { KingComponent } from './King/KingComponent';
import { KnightComponent } from './Knight/KnightComponent';
import { PawnComponent } from './Pawn/PawnComponent';
import { Piece } from './PieceModel';
import { QueenComponent } from './Queen/QueenComponent';
import { RookComponent } from './Rook/RookComponent';

export interface IPieceProps {
  model: Piece;
}

export function PieceComponent({ model }: IPieceProps) {
  const pieceObject = {
    [Pieces.KING]: <KingComponent model={model} />,
    [Pieces.QUEEN]: <QueenComponent model={model} />,
    [Pieces.BISHOP]: <BishopComponent model={model} />,
    [Pieces.KNIGHT]: <KnightComponent model={model} />,
    [Pieces.ROOK]: <RookComponent model={model} />,
    [Pieces.PAWN]: <PawnComponent model={model} />,
  };

  return <>{pieceObject[model.name]}</>;
}
