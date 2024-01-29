import { ReactNode, useEffect, useState } from 'react';
import {
  BishopComponent,
  KingComponent,
  KnightComponent,
  PawnComponent,
  QueenComponent,
  RookComponent,
} from '.';
import { Piece } from '../../model/Piece/PieceModel';
import { IPieceState, Pieces } from '../../types';
import styles from './Piece.module.css';

interface IPieceComponentProps {
  model: Piece;
}

export function PieceComponent({ model }: IPieceComponentProps) {
  const { color, isSelected, name } = model;

  const cssDefault = ` ${styles.Piece} ${styles[color]} `;
  const cssSelected = ` ${styles.active} `;

  const [state, setState] = useState<IPieceState>({
    css: cssDefault,
    svg: getSVG(cssDefault),
  });

  useEffect(() => {
    setState((prev) => {
      const updatedCss = isSelected
        ? prev.css + cssSelected
        : prev.css.replace(cssSelected, '');

      return {
        css: updatedCss,
        svg: getSVG(updatedCss),
      };
    });
  }, [isSelected]);

  function getSVG(css: string): ReactNode {
    const pieces = {
      [Pieces.KING]: <KingComponent css={css} />,
      [Pieces.QUEEN]: <QueenComponent css={css} />,
      [Pieces.BISHOP]: <BishopComponent css={css} />,
      [Pieces.KNIGHT]: <KnightComponent css={css} />,
      [Pieces.ROOK]: <RookComponent css={css} />,
      [Pieces.PAWN]: <PawnComponent css={css} />,
    };

    return pieces[name];
  }

  return <>{state.svg}</>;
}
