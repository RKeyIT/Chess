import { Pieces } from '../../types';
import { BishopComponent } from './BishopComponent';
import { KingComponent } from './KingComponent';
import { KnightComponent } from './KnightComponent';
import { PawnComponent } from './PawnComponent';
import { Piece } from '../../model/Piece/PieceModel';
import { QueenComponent } from './QueenComponent';
import { RookComponent } from './RookComponent';

export interface IPieceProps {
  model: Piece;
}
// FIXME - Fix piece selection view - tip in CellModel refreshComponent()!

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
