import { ReactNode, useEffect, useState } from 'react';
import { Cell } from '../model/CellModel';
import styles from './CellStyles.module.css';
import { PieceComponents } from './Piece/PieceComponents';

interface ICellProps {
  model: Cell;
}

export function CellComponent({ model }: ICellProps) {
  const { color, coordinates, boardField, isUnderAttack } = model;
  const piece = boardField.piece;

  const [pieceComponent, setPieceComponent] = useState<ReactNode | null>(null);
  const [css, setCSS] = useState(`${styles.Cell} ${styles[color]}`);

  useEffect(() => {
    refreshPieceComponent();
  }, [piece]);

  useEffect(() => {
    const cellDefault = ` ${styles.Cell} ${styles[color]} `;
    const underAttack = ` ${styles.UnderAttack} `;
    const withPiece = ` ${styles.WithPiece} `;
    // Border around selected piece
    // const pieceSelected = ` ${styles.WithActivePiece} `;

    if (piece && isUnderAttack) {
      setCSS(cellDefault + withPiece + underAttack);
    } else if (isUnderAttack) {
      setCSS(cellDefault + underAttack);
    } else if (piece) {
      setCSS(cellDefault + withPiece);
    } else {
      setCSS(cellDefault);
    }
  }, [piece, isUnderAttack]);

  function refreshPieceComponent() {
    piece
      ? setPieceComponent(PieceComponents.get(piece))
      : setPieceComponent(null);
  }

  return (
    <div
      className={css} // ${isActive && styles.active}
      data-coordinates={coordinates}
    >
      <div className={styles.coordinates}>{coordinates}</div>
      <div className={styles.highlighter}></div>
      {pieceComponent}
    </div>
  );
}
