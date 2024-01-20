import { PieceNames } from '../types';
import { BishopComponent } from './Bishop/BishopComponent';
import { KingComponent } from './King/KingComponent';
import { KnightComponent } from './Knight/KnightComponent';
import { PawnComponent } from './Pawn/PawnComponent';
import { Piece } from './PieceAbstraction';
import { QueenComponent } from './Queen/QueenComponent';
import { RookComponent } from './Rook/RookComponent';

export interface IPieceProps {
  model: Piece;
}

export function PieceComponent({ model }: IPieceProps) {
  const pieceObject = {
    [PieceNames.KING]: <KingComponent model={model} />,
    [PieceNames.QUEEN]: <QueenComponent model={model} />,
    [PieceNames.BISHOP]: <BishopComponent model={model} />,
    [PieceNames.KNIGHT]: <KnightComponent model={model} />,
    [PieceNames.ROOK]: <RookComponent model={model} />,
    [PieceNames.PAWN]: <PawnComponent model={model} />,
  };

  return <>{pieceObject[model.name]}</>;
}
