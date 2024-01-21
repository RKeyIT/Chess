import { Cell } from './CellModel';
import styles from './CellStyles.module.css';

interface ICellProps {
  CellModel: Cell;
}

export function CellComponent({ CellModel }: ICellProps) {
  const { color, coordinates, boardField, isUnderAttack } = CellModel;
  const piece = boardField.piece;

  const classNames = `${styles.Cell} ${styles[color]} ${
    piece && styles.WithPiece
  }  ${isUnderAttack && styles.UnderAttack}`;
  // const [isActive, setActive] = useState(false);

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
