import { Cell } from './CellModel';
import styles from './CellStyles.module.css';

interface ICellProps {
  model: Cell;
}

export function CellComponent({ model }: ICellProps) {
  const { color, coordinates, boardField, isUnderAttack } = model;
  const piece = boardField.piece;

  const classNames = `${styles.Cell} ${styles[color]} ${
    piece && styles.WithPiece
  }  ${isUnderAttack && styles.UnderAttack}`;

  return (
    <div
      className={classNames} // ${isActive && styles.active}
      data-coordinates={coordinates}
    >
      <div className={styles.coordinates}>{coordinates}</div>
      <div className={styles.highlighter}></div>
      {piece && piece.component}
    </div>
  );
}
