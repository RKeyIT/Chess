import { ReactNode, useEffect, useState } from 'react';
import { Cell } from '../model/CellModel';
import styles from './CellStyles.module.css';
import { PieceComponents } from './Piece/PieceComponents';

interface ICellProps {
  model: Cell;
}

interface ICellState {
  component: ReactNode | null;
  css: string;
}

export function CellComponent({ model }: ICellProps) {
  const { color, coordinates, boardField, isUnderAttack } = model;
  const piece = boardField.piece;

  const [state, setState] = useState<ICellState>({
    component: null,
    css: `${styles.Cell} ${styles[color]}`,
  });

  useEffect(() => {
    const cellDefault = ` ${styles.Cell} ${styles[color]} `;
    const underAttack = ` ${styles.UnderAttack} `;
    const withPiece = ` ${styles.WithPiece} `;

    setState((prev) => {
      if (piece && isUnderAttack) {
        return {
          ...prev,
          css: cellDefault + withPiece + underAttack,
        };
      } else if (isUnderAttack) {
        return {
          ...prev,
          css: cellDefault + underAttack,
        };
      } else if (piece) {
        return {
          ...prev,
          css: cellDefault + withPiece,
        };
      } else {
        return {
          ...prev,
          css: cellDefault,
        };
      }
    });

    refreshPieceComponent();
  }, [piece, isUnderAttack, piece?.isSelected]);

  function refreshPieceComponent() {
    piece
      ? setState((prev) => ({
          ...prev,
          component: PieceComponents.get(piece),
        }))
      : setState((prev) => ({
          ...prev,
          component: null,
        }));
  }

  return (
    <div className={state.css} data-coordinates={coordinates}>
      <div className={styles.coordinates}>{coordinates}</div>
      <div className={styles.highlighter}></div>
      {state.component}
    </div>
  );
}
