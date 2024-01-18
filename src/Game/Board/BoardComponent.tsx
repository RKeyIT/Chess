import { Coordinates } from '../Coordinates/Coordinates';
import { Board } from './BoardModel';
import styles from './BoardStyles.module.css';

export function BoardComponent() {
  const board = Board.getInstance();
  const keys = Coordinates.xyArray;

  return (
    <div className={styles.Board}>
      {keys.map((key) => {
        return board.field[key].cell.component;
      })}
    </div>
  );
}
