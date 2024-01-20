import { Cell } from './CellModel';
import styles from './CellStyles.module.css';

interface ICellProps {
  CellModel: Cell;
}

export function CellComponent({ CellModel }: ICellProps) {
  const { color, coordinates, boardField } = CellModel;
  const piece = boardField.piece;

  // const [isActive, setActive] = useState(false);

  return (
    <div
      className={`${styles.Cell} ${piece && styles.WithPiece} ${styles[color]}`} // ${isActive && styles.active}
      data-coordinates={coordinates}
    >
      <div className={styles.coordinates}>{coordinates}</div>
      <div className={styles.highlighter}></div>
      {piece && piece.component}
    </div>
  );
}
