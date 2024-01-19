import { Cell } from './CellModel';
import styles from './CellStyles.module.css';

interface ICellProps {
  CellModel: Cell;
}

export function CellComponent({ CellModel }: ICellProps) {
  const { color, coordinates, boardField } = CellModel;
  const piece = boardField.piece;

  return (
    <div className={`${styles.Cell} ${styles[color]}`}>
      <div className={styles.coordinates}>{coordinates}</div>
      <div className={styles.highlighter}></div>
      {piece && piece.component}
    </div>
  );
}
