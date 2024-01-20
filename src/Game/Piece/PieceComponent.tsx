import { PieceNames } from '../types';
import { BishopComponent } from './Bishop/BishopComponent';
import { KingComponent } from './King/KingComponent';
import { KnightComponent } from './Knight/KnightComponent';
import { PawnComponent } from './Pawn/PawnComponent';
import { Piece } from './PieceAbstraction';
import { QueenComponent } from './Queen/QueenComponent';
import { RookComponent } from './Rook/RookComponent';

interface IPieceProps {
  model: Piece;
}

export function PieceComponent({ model }: IPieceProps) {
  const pieceObject = {
    [PieceNames.KING]: <KingComponent />,
    [PieceNames.QUEEN]: <QueenComponent />,
    [PieceNames.BISHOP]: <BishopComponent />,
    [PieceNames.KNIGHT]: <KnightComponent />,
    [PieceNames.ROOK]: <RookComponent />,
    [PieceNames.PAWN]: <PawnComponent model={model} />,
  };

  return <>{pieceObject[model.name]}</>;
}
